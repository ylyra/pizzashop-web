import { cn } from '@/lib/utils'

export type OrderStatusProp =
	| 'pending'
	| 'canceled'
	| 'processing'
	| 'delivering'
	| 'delivered'

type OrderStatusProps = {
	status: OrderStatusProp
}

const orderStatusMap: Record<OrderStatusProp, string> = {
	pending: 'Pendente',
	canceled: 'Cancelado',
	delivered: 'Entregue',
	processing: 'Em preparo',
	delivering: 'Em entrega'
}

export function OrderStatus({ status }: OrderStatusProps) {
	return (
		<div className="flex items-center gap-2">
			<span
				className={cn('h-2 w-2 block rounded-full', {
					'bg-slate-400': status === 'pending',
					'bg-rose-500': status === 'canceled',
					'bg-emerald-500': status === 'delivered',
					'bg-ambber-500': ['processing', 'delivering'].includes(status)
				})}
			/>
			<span className="text-muted-foreground font-medium">
				{orderStatusMap[status]}
			</span>
		</div>
	)
}
