import { getOrderDetails } from '@/api/get-order-details'
import { OrderStatus } from '@/components/order-status'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import { formatNumberToCurrency } from '@/utils/formatNumberToCurrency'
import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Search } from 'lucide-react'
import { useState } from 'react'

type Props = {
	orderId: string
}

export function OrderDetails({ orderId }: Props) {
	const [isDetailsOpen, setIsDetailsOpen] = useState(false)
	const { data: order } = useQuery({
		queryKey: ['order-details', orderId],
		queryFn: async () => getOrderDetails({ orderId }),
		enabled: isDetailsOpen
	})

	return (
		<Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" size="xs">
					<Search className="size-3" />
					<span className="sr-only">Detalhes do pedido</span>
				</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Pedido: #{orderId}</DialogTitle>
					<DialogDescription>Detalhes do pedido</DialogDescription>
				</DialogHeader>

				{order && (
					<div className="space-y-6">
						<Table>
							<TableBody>
								<TableRow>
									<TableCell className="text-muted-foreground">
										Status
									</TableCell>
									<TableCell className="flex justify-end">
										<OrderStatus status={order.status} />
									</TableCell>
								</TableRow>

								<TableRow>
									<TableCell className="text-muted-foreground">
										Cliente
									</TableCell>
									<TableCell className="flex justify-end">
										{order?.customer.name}
									</TableCell>
								</TableRow>

								<TableRow>
									<TableCell className="text-muted-foreground">
										Telefone
									</TableCell>
									<TableCell className="flex justify-end">
										{order?.customer.phone ?? 'Não informado'}
									</TableCell>
								</TableRow>

								<TableRow>
									<TableCell className="text-muted-foreground">
										E-mail
									</TableCell>
									<TableCell className="flex justify-end">
										{order?.customer.email}
									</TableCell>
								</TableRow>

								<TableRow>
									<TableCell className="text-muted-foreground">
										Realizado há
									</TableCell>
									<TableCell className="flex justify-end">
										{formatDistanceToNow(order.createdAt, {
											locale: ptBR,
											addSuffix: true
										})}
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>

						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Produto</TableHead>
									<TableHead className="text-right">Qtd.</TableHead>
									<TableHead className="text-right">Preço</TableHead>
									<TableHead className="text-right">Subtotal</TableHead>
								</TableRow>
							</TableHeader>

							<TableBody>
								{order.orderItems.map((item) => (
									<TableRow key={item.id}>
										<TableCell>{item.product.name}</TableCell>
										<TableCell className="text-right">
											{item.quantity}
										</TableCell>
										<TableCell className="text-right">
											{formatNumberToCurrency(item.priceInCents / 100)}
										</TableCell>
										<TableCell className="text-right">
											{formatNumberToCurrency(
												(item.priceInCents / 100) * item.quantity
											)}
										</TableCell>
									</TableRow>
								))}
							</TableBody>

							<TableFooter>
								<TableRow>
									<TableCell colSpan={3}>
										<span className="text-muted-foreground font-medium">
											Total do pedido
										</span>
									</TableCell>
									<TableCell className="text-right">
										{formatNumberToCurrency(order?.totalInCents / 100)}
									</TableCell>
								</TableRow>
							</TableFooter>
						</Table>
					</div>
				)}
			</DialogContent>
		</Dialog>
	)
}
