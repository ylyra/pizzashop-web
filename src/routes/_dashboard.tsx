import { Header } from '@/components/header'
import { NotFound } from '@/components/not-found'
import { api } from '@/lib/axios'
import { Outlet, createFileRoute, useRouter } from '@tanstack/react-router'
import { isAxiosError } from 'axios'
import { useEffect } from 'react'

export const Route = createFileRoute('/_dashboard')({
	component: LayoutComponent,
	notFoundComponent: NotFound
})

function LayoutComponent() {
	const router = useRouter()

	useEffect(() => {
		const interceptorId = api.interceptors.response.use(
			(response) => response,
			(error) => {
				if (isAxiosError(error)) {
					const status = error.response?.status
					const code = error.response?.data?.code

					if (status === 401 && code === 'UNAUTHORIZED') {
						router.history.push('/sign-in')
					}
				}
			}
		)

		return () => {
			api.interceptors.response.eject(interceptorId)
		}
	}, [router])

	return (
		<div className="flex min-h-dvh flex-col">
			<Header />

			<div className="flex flex-1 flex-col gap-4 p-8 pt-6">
				<Outlet />
			</div>
		</div>
	)
}
