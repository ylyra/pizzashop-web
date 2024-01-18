import { Outlet, RootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = new RootRoute({
	component: RootComponent
})

function RootComponent() {
	return (
		<>
			<Outlet />
			{/* Start rendering router matches */}
			<TanStackRouterDevtools position="bottom-right" />
		</>
	)
}
