import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { ArrowRight, X } from 'lucide-react'
import { OrderDetails } from './order-details'

export function OrderTableRow() {
	return (
		<TableRow>
			<TableCell>
				<OrderDetails />
			</TableCell>

			<TableCell className="font-mono text-xs font-medium">
				43083cdf-bc53
			</TableCell>

			<TableCell className="text-muted-foreground">há 15 minutos</TableCell>

			<TableCell>
				<div className="flex items-center gap-2">
					<span className="h-2 w-2 block rounded-full bg-slate-400" />
					<span className="text-muted-foreground font-medium">Pendente</span>
				</div>
			</TableCell>

			<TableCell className="font-medium">Yan Lyra de Souza</TableCell>

			<TableCell className="font-medium">R$ 10.537,61</TableCell>

			<TableCell>
				<Button variant="outline" size="xs">
					<ArrowRight className="h-3 w-3 mr-2" />
					Aprovar
				</Button>
			</TableCell>

			<TableCell>
				<Button variant="ghost" size="xs">
					<X className="h-3 w-3 mr-2" />
					Cancelar
				</Button>
			</TableCell>
		</TableRow>
	)
}
