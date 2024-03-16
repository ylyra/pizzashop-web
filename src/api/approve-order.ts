import { api } from '@/lib/axios'

interface Props {
	orderId: string
}

export async function approveOrder({ orderId }: Props) {
	await api.patch(`/orders/${orderId}/approve`)
}
