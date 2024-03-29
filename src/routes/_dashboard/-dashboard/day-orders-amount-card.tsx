import { getDayOrdersAmount } from '@/api/get-day-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { Utensils } from 'lucide-react'
import { MetricCardSkeleton } from './metric-card-skeleton'

export function DayOrdersAmountCard() {
	const { data: dayOrdersAmount, isLoading } = useQuery({
		queryKey: ['metrics', 'day-orders-amount'],
		queryFn: getDayOrdersAmount
	})

	return (
		<Card>
			<CardHeader className="flex-row space-y-0 items-center justify-between pb-2">
				<CardTitle className="text-base font-semibold">
					Pedidos no dia
				</CardTitle>
				<Utensils className="size-4 text-muted-foreground" />
			</CardHeader>

			<CardContent className="space-y-1">
				{isLoading && <MetricCardSkeleton />}
				{dayOrdersAmount && (
					<>
						<span className="text-2xl font-bold tracking-tight">
							{dayOrdersAmount.amount.toLocaleString('pt-BR')}
						</span>

						<p className="text-xs text-muted-foreground">
							{dayOrdersAmount.diffFromYesterday >= 0 ? (
								<span className="text-emerald-500 dark:text-emerald-400">
									+{dayOrdersAmount.diffFromYesterday}%
								</span>
							) : (
								<span className="text-rose-500 dark:text-rose-400">
									{dayOrdersAmount.diffFromYesterday}%
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
