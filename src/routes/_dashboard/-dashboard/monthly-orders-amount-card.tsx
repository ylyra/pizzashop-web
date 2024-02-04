import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Utensils } from 'lucide-react'

export function MonthlyOrdersAmountCard() {
	return (
		<Card>
			<CardHeader className="flex-row space-y-0 items-center justify-between pb-2">
				<CardTitle className="text-base font-semibold">
					Pedidos no mês
				</CardTitle>
				<Utensils className="size-4 text-muted-foreground" />
			</CardHeader>

			<CardContent className="space-y-1">
				<span className="text-2xl font-bold tracking-tight">163</span>
				<p className="text-xs text-muted-foreground">
					<span className="text-emerald-500 dark:text-emerald-400">+8%</span> em
					relação ao mês passado
				</p>
			</CardContent>
		</Card>
	)
}
