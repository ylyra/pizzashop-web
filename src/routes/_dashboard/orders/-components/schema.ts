
import { Output, object, optional, picklist, string } from 'valibot'

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
	)
})

export type OrderSearch = Output<typeof ordersSearchSchema>