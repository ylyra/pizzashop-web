import { getMonthRevenue } from '@/api/get-month-revenue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatNumberToCurrency } from '@/utils/formatNumberToCurrency'
import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'

export function MonthlyRevenueCard() {
	const { data: monthRevenue } = useQuery({
		queryKey: ['metrics', 'month-revenue'],
		queryFn: getMonthRevenue
	})

	return (
		<Card>
			<CardHeader className="flex-row space-y-0 items-center justify-between pb-2">
				<CardTitle className="text-base font-semibold">
					Receita total no mês
				</CardTitle>
				<DollarSign className="size-4 text-muted-foreground" />
			</CardHeader>

			<CardContent className="space-y-1">
				{monthRevenue && (
					<>
						<span className="text-2xl font-bold tracking-tight">
							{formatNumberToCurrency(monthRevenue.receipt / 100)}
						</span>
						<p className="text-xs text-muted-foreground">
							{monthRevenue.diffFromLastMonth >= 0 ? (
								<span className="text-emerald-500 dark:text-emerald-400">
									+{monthRevenue.diffFromLastMonth}%
								</span>
							) : (
								<span className="text-rose-500 dark:text-rose-400">
									{monthRevenue.diffFromLastMonth}%
								</span>
							)}{' '}
							em relação ao dia anterior
						</p>
					</>
				)}
			</CardContent>
		</Card>
	)
}
