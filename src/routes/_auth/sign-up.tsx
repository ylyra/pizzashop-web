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
import { FileRoute, Link, useRouter } from '@tanstack/react-router'
import { Loader } from 'lucide-react'
import { useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Output, email, minLength, object, string } from 'valibot'

export const Route = new FileRoute('/_auth/sign-up').createRoute({
	component: Page
})

const schema = object({
	email: string([email('E-mail inválido'), minLength(5, 'E-mail inválido')]),
	restaurant_name: string([minLength(5, 'Nome do restaurente obrigatório')]),
	manager_name: string([minLength(5, 'Seu nome é obrigatório')]),
	phone: string([minLength(11, 'Telefone obrigatório')])
})

type FormProps = Output<typeof schema>

function Page() {
	const router = useRouter()
	const form = useForm<FormProps>({
		resolver: valibotResolver(schema),
		defaultValues: {
			email: '',
			manager_name: '',
			phone: '',
			restaurant_name: ''
		}
	})

	const onSubmit = useCallback<SubmitHandler<FormProps>>(
		async (values) => {
			try {
				toast.success('Restaurante cadastrado com sucesso!', {
					action: {
						label: 'Login',
						onClick: () => router.history.push('/sign-in')
					}
				})
				console.log(values)
			} catch (error) {
				toast.error('Erro ao cadastrar restaurante')
			}
		},
		[router]
	)

	return (
		<>
			<Helmet title="Cadastre-se" />
			<div className="p-8 max-w-[420px] w-full flex flex-col justify-center gap-6">
				<Button asChild className="absolute right-4 top-8" variant="ghost">
					<Link to="/sign-in">Fazer login</Link>
				</Button>

				<div className="flex flex-col gap-2 text-center">
					<h1 className="text-2xl font-semibold tracking-tight">
						Criar conta grátis
					</h1>
					<p className="text-sm text-muted-foreground">
						Seja um parceiro e comece a vender hoje mesmo
					</p>
				</div>

				<Form {...form}>
					<form
						className="block space-y-4"
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<FormField
							control={form.control}
							name="restaurant_name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nome do establecimento</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="manager_name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Seu nome</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

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

						<FormField
							control={form.control}
							name="phone"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Seu telefone</FormLabel>
									<FormControl>
										<Input {...field} type="tel" />
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
								'Finalizar cadastro'
							)}
						</Button>

						<p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
							Ao continuar você concorda com os nossos{' '}
							<a
								href="https://google.com"
								className="underline underline-offset-2"
							>
								Termos de serviços
							</a>{' '}
							e{' '}
							<a
								href="https://google.com"
								className="underline underline-offset-2"
							>
								política de privacidade
							</a>
						</p>
					</form>
				</Form>
			</div>
		</>
	)
}
