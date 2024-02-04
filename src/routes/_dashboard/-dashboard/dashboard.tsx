import { Helmet } from 'react-helmet-async'
import { DayOrdersAmountCard } from './day-orders-amount-card'
import { MonthlyCanceledOrdersCard } from './monthly-canceled-orders-card'
import { MonthlyOrdersAmountCard } from './monthly-orders-amount-card'
import { MonthlyRevenueCard } from './monthly-revenue-card'
import { PopularProductsChart } from './popular-products-chart'
import { RevenueChart } from './revenue-chat'

export function Dashboard() {
	return (
		<>
			<Helmet title="Página Principal" />
			<div className="flex flex-col gap-4">
				<h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

				<div className="grid grid-cols-4 gap-4">
					<MonthlyRevenueCard />
					<MonthlyOrdersAmountCard />
					<DayOrdersAmountCard />
					<MonthlyCanceledOrdersCard />
				</div>

				<div className="grid grid-cols-9 gap-4">
					<RevenueChart />
					<PopularProductsChart />
				</div>
			</div>
		</>
	)
}
