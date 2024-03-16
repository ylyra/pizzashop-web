import { api } from '@/lib/axios'

interface Props {
	orderId: string
}

export async function dispatchOrder({ orderId }: Props) {
	await api.patch(`/orders/${orderId}/dispatch`)
}
