import { cn } from '@/lib/utils'
import { Link, LinkProps } from '@tanstack/react-router'

export function NavLink({ className, ...props }: LinkProps) {
	return (
		<Link
			{...props}
			className={cn(
				'flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground data-[status=active]:text-foreground',
				className
			)}
		/>
	)
}
