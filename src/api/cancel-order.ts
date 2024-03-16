import { api } from '@/lib/axios'

interface Props {
	orderId: string
}

export async function cancelOrder({ orderId }: Props) {
	await api.patch(`/orders/${orderId}/cancel`)
}
