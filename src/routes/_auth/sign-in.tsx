import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { FileRoute, Link } from '@tanstack/react-router'
import { Loader } from 'lucide-react'
import { useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Output, email, minLength, object, string } from 'valibot'

export const Route = new FileRoute('/_auth/sign-in').createRoute({
	component: SignIn
})

const schema = object({
	email: string([email('E-mail inválido'), minLength(5, 'E-mail inválido')])
})

type FormProps = Output<typeof schema>

function SignIn() {
	const form = useForm<FormProps>({
		resolver: valibotResolver(schema),
		defaultValues: {
			email: ''
		}
	})

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const onSubmit = useCallback<SubmitHandler<FormProps>>(async (values) => {
		try {
			toast.success('Enviamos um link de acesso para seu e-mail', {
				action: {
					label: 'Reenviar',
					onClick: () => onSubmit(values)
				}
			})
		} catch (error) {
			toast.error('Credenciais inválidas')
		}
	}, [])

	return (
		<>
			<Helmet title="Login" />
			<div className="p-8 max-w-[420px] w-full flex flex-col justify-center gap-6">
				<Button asChild className="absolute right-4 top-8" variant="ghost">
					<Link to="/sign-up">Novo estabelecimento</Link>
				</Button>

				<div className="flex flex-col gap-2 text-center">
					<h1 className="text-2xl font-semibold tracking-tight">
						Acessar painel
					</h1>
					<p className="text-sm text-muted-foreground">
						Acompanhe suas vendas pelo painel do parceiro
					</p>
				</div>

				<Form {...form}>
					<form
						className="block space-y-4"
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Seu e-mail</FormLabel>
									<FormControl>
										<Input {...field} type="email" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							type="submit"
							className="w-full"
							disabled={form.formState.isSubmitting}
						>
							{form.formState.isSubmitting ? (
								<>
									<Loader className="w-4 h-4 mr-2 animate-spin" />
									Aguarde...
								</>
							) : (
								'Acessar painel'
							)}
						</Button>
					</form>
				</Form>
			</div>
		</>
	)
}
