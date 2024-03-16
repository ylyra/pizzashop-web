import { api } from '@/lib/axios'

export type GetDailyRevenueInPeriodResponse = {
	date: string
	receipt: number
}[]

interface GetDailyRevenueInPeriodQuery {
	from?: Date
	to?: Date
}

export async function getDailyRevenueInPeriod({
	from,
	to
}: GetDailyRevenueInPeriodQuery) {
	const response = await api.get<GetDailyRevenueInPeriodResponse>(
		'/metrics/daily-receipt-in-period',
		{
			params: {
				from,
				to
			}
		}
	)

	return response.data.map((item) => ({
		...item,
		receipt: item.receipt / 100
	}))
}
