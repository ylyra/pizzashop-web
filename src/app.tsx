import { RouterProvider } from '@tanstack/react-router'
import ReactDOM from 'react-dom/client'
import './global.css'

import { QueryClientProvider } from '@tanstack/react-query'
import { createRouter } from '@tanstack/react-router'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { NotFound } from './components/not-found'
import { ThemeProvider } from './components/theme/provider'
import { Toaster } from './components/ui/sonner'
import { queryClient } from './lib/react-query'
// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Set up a Router instance
const router = createRouter({
	routeTree,
	defaultPreload: 'intent',
	// Since we're using React Query, we don't want loader calls to ever be stale
	// This will ensure that the loader is always called when the route is preloaded or visited
	defaultPreloadStaleTime: 0,
	globalNotFound: NotFound
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
				<QueryClientProvider client={queryClient}>
					<RouterProvider router={router} globalNotFound={NotFound} />
				</QueryClientProvider>
				<Toaster richColors />
			</ThemeProvider>
		</HelmetProvider>
	)
}
