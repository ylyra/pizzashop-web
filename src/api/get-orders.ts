import { api } from '@/lib/axios'

export type GetOrdersResponse = {
	orders: {
		orderId: string
		createdAt: string
		status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
		customerName: string
		total: number
	}[]
	meta: {
		pageIndex: number
		perPage: number
		totalCount: number
	}
}

export interface GetOrdersQuery {
	pageIndex?: number | null
	order_id: string
	name: string
	status:
		| 'all'
		| 'pending'
		| 'processing'
		| 'delivering'
		| 'delivered'
		| 'canceled'
}

export async function getOrders({
	pageIndex,
	name,
	order_id,
	status
}: GetOrdersQuery) {
	const response = await api.get<GetOrdersResponse>('/orders', {
		params: {
			pageIndex: pageIndex,

			...(name.length > 0 && { customerName: name }),
			...(order_id.length > 0 && { orderId: order_id }),
			...(status !== 'all' && { status })
		}
	})

	return response.data
}
