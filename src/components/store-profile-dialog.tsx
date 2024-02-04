import {
	GetManagedRestaurantResponse,
	getManagedRestaurant
} from '@/api/get-managed-restaurant'
import { updateRestaurantProfile } from '@/api/update-restaurant-profile'
import { queryClient } from '@/lib/react-query'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Output, object, string } from 'valibot'
import { Button } from './ui/button'
import {
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from './ui/dialog'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from './ui/form'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'

const schema = object({
	name: string(),
	description: string()
})

type FormProps = Output<typeof schema>

export function StoreProfileDialog() {
	const { data: managedRestaurant } = useQuery({
		queryKey: ['managed-restaurant'],
		queryFn: getManagedRestaurant,
		staleTime: Infinity
	})

	const form = useForm<FormProps>({
		resolver: valibotResolver(schema),
		defaultValues: {
			description: managedRestaurant?.description ?? '',
			name: managedRestaurant?.name ?? ''
		}
	})
	const { mutateAsync: updateRestaurantProfileFn } = useMutation({
		mutationFn: updateRestaurantProfile,
		onMutate(variables) {
			return updateManagedRestaurantCache(variables)
		},
		onError(_, __, ctx) {
			if (ctx?.cached) {
				updateManagedRestaurantCache({
					name: ctx?.cached.name,
					description: ctx?.cached.description ?? ''
				})
			}
		}
	})

	const onSubmit = useCallback<SubmitHandler<FormProps>>(
		async (values) => {
			try {
				await updateRestaurantProfileFn(values)

				toast.success('Perfil atualizado com sucesso')
			} catch (error) {
				toast.error('Falha ao atualizar perfil')
			}
		},
		[updateRestaurantProfileFn]
	)

	function updateManagedRestaurantCache(values: FormProps) {
		const cached = queryClient.getQueryData<GetManagedRestaurantResponse>([
			'managed-restaurant'
		])

		if (cached) {
			queryClient.setQueryData<GetManagedRestaurantResponse>(
				['managed-restaurant'],
				{
					...cached,
					...values
				}
			)
		}

		return { cached }
	}

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Perfil da Loja</DialogTitle>
				<DialogDescription>
					Atualize as informações do seu estabelecimento visíveis para os
					clientes.
				</DialogDescription>
			</DialogHeader>

			<Form {...form}>
				<form id="profile-update" onSubmit={form.handleSubmit(onSubmit)}>
					<div className="space-y-4 py-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem className="grid grid-cols-4 items-center gap-4 space-y-0">
									<FormLabel className="text-right">Nome</FormLabel>
									<div className="col-span-3">
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</div>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem className="grid grid-cols-4 items-center gap-4 space-y-0">
									<FormLabel className="text-right">Descrição</FormLabel>
									<div className="col-span-3">
										<FormControl>
											<Textarea {...field} />
										</FormControl>
										<FormMessage />
									</div>
								</FormItem>
							)}
						/>
					</div>
				</form>
			</Form>

			<DialogFooter>
				<DialogClose>
					<Button
						variant="ghost"
						type="button"
						disabled={form.formState.isSubmitting}
					>
						Cancelar
					</Button>
				</DialogClose>

				<Button
					type="submit"
					variant="success"
					form="profile-update"
					disabled={form.formState.isSubmitting}
				>
					Salvar
				</Button>
			</DialogFooter>
		</DialogContent>
	)
}
