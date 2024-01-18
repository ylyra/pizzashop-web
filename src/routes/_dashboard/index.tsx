import { FileRoute, redirect } from '@tanstack/react-router'
import { Helmet } from 'react-helmet-async'

const isAuthenticated = () => {
	return true
}

export const Route = new FileRoute('/_dashboard/').createRoute({
	beforeLoad: async ({ location }) => {
		if (!isAuthenticated()) {
			throw redirect({
				to: '/sign-in',
				search: {
					// Use the current location to power a redirect after login
					// (Do not use `router.state.resolvedLocation` as it can
					// potentially lag behind the actual current location)
					redirect: location.href
				}
			})
		}
	},
	component: Home
})

function Home() {
	return (
		<>
			<Helmet title="Página Principal" />
			<h3>Welcome to Home!</h3>
		</>
	)
}
