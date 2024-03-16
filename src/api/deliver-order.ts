import { api } from '@/lib/axios'

interface Props {
	orderId: string
}

export async function deliverOrder({ orderId }: Props) {
	await api.patch(`/orders/${orderId}/deliver`)
}
