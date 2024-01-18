import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import { FileRoute, redirect } from '@tanstack/react-router'
import { Helmet } from 'react-helmet-async'
import { parse } from 'valibot'
import { OrderTableFilters } from './-components/order-table-filters'
import { OrderTableRow } from './-components/order-table-row'
import { ordersSearchSchema } from './-components/schema'

const isAuthenticated = () => {
	return true
}

export const Route = new FileRoute('/_dashboard/orders/').createRoute({
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
	return (
		<>
			<Helmet title="Pedidos" />
			<div className="flex flex-col gap-4">
				<h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
			</div>

			<div className="space-y-2.5">
				<OrderTableFilters />

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
							{Array.from({ length: 10 }).map((_, index) => (
								<OrderTableRow key={`test-${index}`} />
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</>
	)
}
