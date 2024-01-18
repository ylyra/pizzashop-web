import { Header } from '@/components/header'
import { FileRoute, Outlet } from '@tanstack/react-router'

export const Route = new FileRoute('/_dashboard').createRoute({
	component: LayoutComponent
})

function LayoutComponent() {
	return (
		<div className="flex min-h-dvh flex-col">
			<Header />

			<div className="flex flex-1 flex-col gap-4 p-8 pt-6">
				<Outlet />
			</div>
		</div>
	)
}
