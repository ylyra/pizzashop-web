import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import { Search } from 'lucide-react'

export function OrderDetails() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" size="xs">
					<Search className="size-3" />
					<span className="sr-only">Detalhes do pedido</span>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Pedido: #43083cdf-bc53</DialogTitle>
					<DialogDescription>Detalhes do pedido</DialogDescription>
				</DialogHeader>

				<div className="space-y-6">
					<Table>
						<TableBody>
							<TableRow>
								<TableCell className="text-muted-foreground">Status</TableCell>
								<TableCell className="flex justify-end">
									<div className="flex items-center gap-2">
										<span className="h-2 w-2 block rounded-full bg-slate-400" />
										<span className="text-muted-foreground font-medium">
											Pendente
										</span>
									</div>
								</TableCell>
							</TableRow>

							<TableRow>
								<TableCell className="text-muted-foreground">Cliente</TableCell>
								<TableCell className="flex justify-end">Yan Lyra</TableCell>
							</TableRow>

							<TableRow>
								<TableCell className="text-muted-foreground">
									Telefone
								</TableCell>
								<TableCell className="flex justify-end">
									(84) 99999-9999
								</TableCell>
							</TableRow>

							<TableRow>
								<TableCell className="text-muted-foreground">E-mail</TableCell>
								<TableCell className="flex justify-end">
									yan.lyra@growth.sale
								</TableCell>
							</TableRow>

							<TableRow>
								<TableCell className="text-muted-foreground">
									Realizado há
								</TableCell>
								<TableCell className="flex justify-end">há 3 minutos</TableCell>
							</TableRow>
						</TableBody>
					</Table>

					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Produto</TableHead>
								<TableHead className="text-right">Qtd.</TableHead>
								<TableHead className="text-right">Preço</TableHead>
								<TableHead className="text-right">Subtotal</TableHead>
							</TableRow>
						</TableHeader>

						<TableBody>
							<TableRow>
								<TableCell>Calabresa</TableCell>
								<TableCell className="text-right">1</TableCell>
								<TableCell className="text-right">R$ 30,00</TableCell>
								<TableCell className="text-right">R$ 30,00</TableCell>
							</TableRow>

							<TableRow>
								<TableCell>Frango com Catupiry</TableCell>
								<TableCell className="text-right">2</TableCell>
								<TableCell className="text-right">R$ 35,00</TableCell>
								<TableCell className="text-right">R$ 70,00</TableCell>
							</TableRow>
						</TableBody>
						<TableFooter>
							<TableRow>
								<TableCell colSpan={3}>
									<span className="text-muted-foreground font-medium">
										Total do pedido
									</span>
								</TableCell>
								<TableCell className="text-right">R$ 100,00</TableCell>
							</TableRow>
						</TableFooter>
					</Table>
				</div>
			</DialogContent>
		</Dialog>
	)
}
