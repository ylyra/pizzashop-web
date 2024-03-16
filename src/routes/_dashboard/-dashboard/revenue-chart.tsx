import { getDailyRevenueInPeriod } from '@/api/get-daily-revenue-in-period'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { Label } from '@/components/ui/label'
import { useQuery } from '@tanstack/react-query'
import { subDays } from 'date-fns'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	XAxis,
	YAxis
} from 'recharts'
import colors from 'tailwindcss/colors'

export function RevenueChart() {
	const [dateRange, setDateRange] = useState<DateRange | undefined>({
		from: subDays(new Date(), 7),
		to: new Date()
	})
	const { data: dailyRevenueInPeriod, isLoading } = useQuery({
		queryKey: ['metrics', 'daily-revenue-in-period', dateRange],
		queryFn: () =>
			getDailyRevenueInPeriod({
				from: dateRange?.from,
				to: dateRange?.to
			})
	})

	return (
		<Card className="col-span-6">
			<CardHeader className="flex-row items-center justify-between pb-8">
				<div className="space-y-1">
					<CardTitle className="text-base font-medium">
						Receita no período
					</CardTitle>
					<CardDescription>Receita diária no período</CardDescription>
				</div>
				<div className="flex items-center gap-3">
					<Label>Período</Label>
					<DateRangePicker date={dateRange} onDateChange={setDateRange} />
				</div>
			</CardHeader>
			<CardContent>
				{isLoading && (
					<div className="flex items-center justify-center h-[240px] w-full">
						<Loader2 className="size-8 text-muted-foreground animate-spin" />
					</div>
				)}

				{dailyRevenueInPeriod && (
					<ResponsiveContainer width="100%" height={240}>
						<LineChart style={{ fontSize: 12 }} data={dailyRevenueInPeriod}>
							<YAxis
								stroke="#888"
								axisLine={false}
								tickLine={false}
								width={80}
								tickFormatter={(value: number) => {
									return value.toLocaleString('pt-BR', {
										style: 'currency',
										currency: 'BRL'
									})
								}}
							/>
							<XAxis
								stroke="#888"
								axisLine={false}
								tickLine={false}
								dataKey="date"
								dy={16}
							/>
							<CartesianGrid vertical={false} className="stroke-muted" />

							<Line
								type="linear"
								strokeWidth={2}
								dataKey="receipt"
								stroke={colors.violet[500]}
							/>
						</LineChart>
					</ResponsiveContainer>
				)}
			</CardContent>
		</Card>
	)
}
