import { getMonthCanceledOrdersAmount } from '@/api/get-month-canceled-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'
import { MetricCardSkeleton } from './metric-card-skeleton'

export function MonthlyCanceledOrdersCard() {
	const { data: monthCanceledOrdersAmount, isLoading } = useQuery({
		queryKey: ['metrics', 'month-canceled-orders-amount'],
		queryFn: getMonthCanceledOrdersAmount
	})

	return (
		<Card>
			<CardHeader className="flex-row space-y-0 items-center justify-between pb-2">
				<CardTitle className="text-base font-semibold">
					Cancelamentos (mês)
				</CardTitle>
				<DollarSign className="size-4 text-muted-foreground" />
			</CardHeader>

			<CardContent className="space-y-1">
				{isLoading && <MetricCardSkeleton />}
				{monthCanceledOrdersAmount && (
					<>
						<span className="text-2xl font-bold tracking-tight">
							{monthCanceledOrdersAmount.amount.toLocaleString('pt-BR')}
						</span>

						<p className="text-xs text-muted-foreground">
							{monthCanceledOrdersAmount.diffFromLastMonth <= 0 ? (
								<span className="text-emerald-500 dark:text-emerald-400">
									+{monthCanceledOrdersAmount.diffFromLastMonth}%
								</span>
							) : (
								<span className="text-rose-500 dark:text-rose-400">
									{monthCanceledOrdersAmount.diffFromLastMonth}%
								</span>
							)}{' '}
							em relação ao mês anterior
						</p>
					</>
				)}
			</CardContent>
		</Card>
	)
}
