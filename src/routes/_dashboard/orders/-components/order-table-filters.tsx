import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { X } from 'lucide-react'
import { OrderSearch } from './schema'

export function OrderTableFilters() {
	const navigate = useNavigate()
	const search = useSearch({
		strict: false,
		select(search: OrderSearch) {
			return {
				order_id: search.order_id,
				name: search.name,
				status: search.status
			}
		}
	})

	return (
		<div className="flex items-center gap-2">
			<span className="text-sm font-semibold">Filtros:</span>
			<Input
				placeholder="ID do pedido"
				className="h-8 w-auto"
				value={search.order_id}
				onChange={(e) => {
					navigate({
						search: (prev) => ({
							...prev,
							order_id: e.target.value
						})
					})
				}}
			/>
			<Input
				placeholder="Nome do cliente"
				className="h-8 max-w-[320px] w-full"
				value={search.name}
				onChange={(e) => {
					navigate({
						search: (prev) => ({
							...prev,
							name: e.target.value
						})
					})
				}}
			/>

			<Select
				value={search.status}
				onValueChange={(value) => {
					navigate({
						search: (prev) => ({
							...prev,
							status: value
						})
					})
				}}
			>
				<SelectTrigger className="h-8 max-w-44">
					<SelectValue placeholder="Selecione um status" />
				</SelectTrigger>

				<SelectContent>
					<SelectItem value="all">Todos</SelectItem>
					<SelectItem value="pending">Pendente</SelectItem>
					<SelectItem value="processing">Em preparo</SelectItem>
					<SelectItem value="delivering">Em entrega</SelectItem>
					<SelectItem value="delivered">Entregue</SelectItem>
					<SelectItem value="canceled">Cancelado</SelectItem>
				</SelectContent>
			</Select>

			<Button
				variant="outline"
				size="xs"
				onClick={() => {
					navigate({
						to: '/orders',
						// @ts-ignore
						search: false
					})
				}}
			>
				<X className="mr-2 h-4 w-4" />
				Remover filtros
			</Button>
		</div>
	)
}
