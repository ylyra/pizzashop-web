import { api } from '@/lib/axios'

export type GetOrderDetailsResponse = {
	orderId: string
	createdAt: string
	status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
	customerName: string
	totalInCents: number
	customer: {
		name: string
		email: string
		phone: string
	}
	orderItems: {
		id: string
		priceInCents: number
		quantity: number
		product: {
			name: string
		}
	}[]
}

export interface GetOrderDetailsQuery {
	orderId: string
}

export async function getOrderDetails({ orderId }: GetOrderDetailsQuery) {
	const response = await api.get<GetOrderDetailsResponse>(`/orders/${orderId}`)

	return response.data
}
