import { approveOrder } from '@/api/approve-order'
import { cancelOrder } from '@/api/cancel-order'
import { deliverOrder } from '@/api/deliver-order'
import { dispatchOrder } from '@/api/dispatch-order'
import { GetOrdersResponse } from '@/api/get-orders'
import { OrderStatus, OrderStatusProp } from '@/components/order-status'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { queryClient } from '@/lib/react-query'
import { formatNumberToCurrency } from '@/utils/formatNumberToCurrency'
import { useMutation } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRight, X } from 'lucide-react'
import { OrderDetails } from './order-details'

type OrderTableRowProps = {
	order: {
		orderId: string
		createdAt: string
		status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
		customerName: string
		total: number
	}
}

export function OrderTableRow({ order }: OrderTableRowProps) {
	function updateOrderStatusOnCache(orderId: string, status: OrderStatusProp) {
		const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
			queryKey: ['orders']
		})

		for (const [cacheKey, cacheData] of ordersListCache) {
			if (!cacheData) {
				continue
			}

			queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
				...cacheData,
				orders: cacheData.orders.map((order) => {
					if (order.orderId === orderId) {
						return {
							...order,
							status
						}
					}

					return order
				})
			})
		}
	}
	const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } =
		useMutation({
			mutationFn: cancelOrder,
			async onSuccess(_, variables) {
				updateOrderStatusOnCache(variables.orderId, 'canceled')
			}
		})
	const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } =
		useMutation({
			mutationFn: approveOrder,
			async onSuccess(_, variables) {
				updateOrderStatusOnCache(variables.orderId, 'processing')
			}
		})
	const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } =
		useMutation({
			mutationFn: dispatchOrder,
			async onSuccess(_, variables) {
				updateOrderStatusOnCache(variables.orderId, 'delivering')
			}
		})
	const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } =
		useMutation({
			mutationFn: deliverOrder,
			async onSuccess(_, variables) {
				updateOrderStatusOnCache(variables.orderId, 'delivered')
			}
		})

	return (
		<TableRow>
			<TableCell>
				<OrderDetails orderId={order.orderId} />
			</TableCell>

			<TableCell className="font-mono text-xs font-medium">
				{order.orderId}
			</TableCell>

			<TableCell className="text-muted-foreground">
				{formatDistanceToNow(order.createdAt, {
					locale: ptBR,
					addSuffix: true
				})}
			</TableCell>

			<TableCell>
				<OrderStatus status={order.status} />
			</TableCell>

			<TableCell className="font-medium">{order.customerName}</TableCell>

			<TableCell className="font-medium">
				{formatNumberToCurrency(order.total / 100)}
			</TableCell>

			<TableCell>
				{order.status === 'pending' && (
					<Button
						variant="outline"
						size="xs"
						onClick={() => approveOrderFn({ orderId: order.orderId })}
						disabled={isApprovingOrder || isCancelingOrder}
					>
						<ArrowRight className="h-3 w-3 mr-2" />
						Aprovar
					</Button>
				)}

				{order.status === 'processing' && (
					<Button
						variant="outline"
						size="xs"
						onClick={() => dispatchOrderFn({ orderId: order.orderId })}
						disabled={isDispatchingOrder || isCancelingOrder}
					>
						<ArrowRight className="h-3 w-3 mr-2" />
						Em entrega
					</Button>
				)}

				{order.status === 'delivering' && (
					<Button
						variant="outline"
						size="xs"
						onClick={() => deliverOrderFn({ orderId: order.orderId })}
						disabled={isDeliveringOrder || isCancelingOrder}
					>
						<ArrowRight className="h-3 w-3 mr-2" />
						Entregue
					</Button>
				)}
			</TableCell>

			<TableCell>
				<Button
					disabled={
						!['pending', 'processing'].includes(order.status) ||
						isCancelingOrder
					}
					variant="ghost"
					size="xs"
					onClick={() => cancelOrderFn({ orderId: order.orderId })}
				>
					<X className="h-3 w-3 mr-2" />
					Cancelar
				</Button>
			</TableCell>
		</TableRow>
	)
}
