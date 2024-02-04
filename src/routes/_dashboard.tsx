import { Header } from '@/components/header'
import { NotFound } from '@/components/not-found'
import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard')({
	component: LayoutComponent,
	notFoundComponent: NotFound
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
