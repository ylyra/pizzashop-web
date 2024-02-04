import { Output, number, object, optional, picklist, string } from 'valibot'

export const ordersSearchSchema = object({
	order_id: optional(string(), ''),
	name: optional(string(), ''),
	status: optional(
		picklist([
			'all',
			'pending',
			'processing',
			'delivering',
			'delivered',
			'canceled'
		]),
		'all'
	),
	page: optional(number(), 1)
})

export type OrderSearch = Output<typeof ordersSearchSchema>
