import { getOrders } from '@/api/get-orders'
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious
} from '@/components/ui/pagination'
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, redirect, useRouter } from '@tanstack/react-router'
import { ChevronsLeft, ChevronsRight } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { parse } from 'valibot'
import { OrderTableFilters } from './-components/order-table-filters'
import { OrderTableRow } from './-components/order-table-row'
import { ordersSearchSchema } from './-components/schema'

const isAuthenticated = () => {
	return true
}

export const Route = createFileRoute('/_dashboard/orders/')({
	beforeLoad: async ({ location }) => {
		if (!isAuthenticated()) {
			throw redirect({
				to: '/sign-in',
				search: {
					// Use the current location to power a redirect after login
					// (Do not use `router.state.resolvedLocation` as it can
					// potentially lag behind the actual current location)
					redirect: location.href
				}
			})
		}
	},
	component: Page,
	validateSearch: (search: Record<string, unknown>) =>
		parse(ordersSearchSchema, search)
})

function Page() {
	const { name, order_id, page, status } = Route.useSearch()
	const router = useRouter()
	const { data: result } = useQuery({
		queryKey: ['orders', page, name, order_id, status],
		queryFn: () =>
			getOrders({
				pageIndex: page - 1,
				name,
				order_id,
				status
			})
	})

	return (
		<>
			<Helmet title="Pedidos" />
			<div className="flex flex-col gap-4">
				<h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>

				<div className="space-y-2.5">
					<OrderTableFilters
						name={name}
						order_id={order_id}
						status={status}
						page={page}
					/>

					<div className="border rounded-md">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="w-[64px]" />
									<TableHead className="w-[140px]">Identificador</TableHead>
									<TableHead className="w-[180px]">Realizado há</TableHead>
									<TableHead className="w-[140px]">Status</TableHead>
									<TableHead>Cliente</TableHead>
									<TableHead className="w-[140px]">Total do Pedido</TableHead>
									<TableHead className="w-[164px]" />
									<TableHead className="w-[132px]" />
								</TableRow>
							</TableHeader>

							<TableBody>
								{result?.orders.map((order) => (
									<OrderTableRow key={order.orderId} order={order} />
								))}
							</TableBody>
						</Table>
					</div>

					{result && (
						<div className="flex items-center justify-between">
							<span className="text-sm text-muted-foreground">
								Total de {result.meta.totalCount} item(s)
							</span>

							<Pagination className="w-auto mx-0">
								<PaginationContent>
									<PaginationItem>
										<PaginationLink
											onClick={() => {
												router.history.push(
													`/orders?page=1&name=${name}&order_id=${order_id}&status=${status}`
												)
											}}
											disabled={page === 1}
										>
											<ChevronsLeft className="size-4" />
										</PaginationLink>
									</PaginationItem>

									<PaginationItem>
										<PaginationPrevious
											onClick={() => {
												router.history.push(
													`/orders?page=${
														page > 1 ? page - 1 : page
													}&name=${name}&order_id=${order_id}&status=${status}`
												)
											}}
											disabled={page === 1}
										/>
									</PaginationItem>

									<PaginationItem>
										<PaginationNext
											onClick={() => {
												router.history.push(
													`/orders?page=${
														page <
														Math.ceil(
															result.meta.totalCount / result.meta.perPage
														)
															? page + 1
															: page
													}&name=${name}&order_id=${order_id}&status=${status}`
												)
											}}
											disabled={
												page ===
												Math.ceil(result.meta.totalCount / result.meta.perPage)
											}
										/>
									</PaginationItem>

									<PaginationItem>
										<PaginationLink
											onClick={() => {
												router.history.push(
													`/orders?page=${Math.ceil(
														result.meta.totalCount / result.meta.perPage
													)}&name=${name}&order_id=${order_id}&status=${status}`
												)
											}}
											disabled={
												page ===
												Math.ceil(result.meta.totalCount / result.meta.perPage)
											}
										>
											<ChevronsRight className="size-4" />
										</PaginationLink>
									</PaginationItem>
								</PaginationContent>
							</Pagination>
						</div>
					)}
				</div>
			</div>
		</>
	)
}
