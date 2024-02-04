import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
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
