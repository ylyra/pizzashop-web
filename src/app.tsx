import { Router, RouterProvider } from '@tanstack/react-router'
import ReactDOM from 'react-dom/client'
import './global.css'

import { Helmet, HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './components/theme/provider'
import { Toaster } from './components/ui/sonner'
// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Set up a Router instance
const router = new Router({
	routeTree,
	defaultPreload: 'intent',
	// Since we're using React Query, we don't want loader calls to ever be stale
	// This will ensure that the loader is always called when the route is preloaded or visited
	defaultPreloadStaleTime: 0
})

// Register things for typesafety
declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}

// Render the app
// biome-ignore lint/style/noNonNullAssertion: <explanation>
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement)
	root.render(
		<HelmetProvider>
			<ThemeProvider defaultTheme="dark" storageKey="pizzashop.theme">
				<Helmet titleTemplate="%s | pizza.shop" />
				<RouterProvider router={router} />
				<Toaster richColors />
			</ThemeProvider>
		</HelmetProvider>
	)
}
