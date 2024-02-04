import { getManagedRestaurant } from '@/api/get-managed-restaurant'
import { getProfile } from '@/api/get-profile'
import { signOut } from '@/api/sign-out'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Building, ChevronDown, LogOut } from 'lucide-react'
import { StoreProfileDialog } from './store-profile-dialog'
import { Button } from './ui/button'
import { Dialog, DialogTrigger } from './ui/dialog'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from './ui/dropdown-menu'
import { Skeleton } from './ui/skeleton'

export function AccountMenu() {
	const navigate = useNavigate()

	const {
		data: profile,
		isLoading: isLoadingProfile,
		isSuccess: isProfileSuccess
	} = useQuery({
		queryKey: ['profile'],
		queryFn: getProfile,
		staleTime: Infinity
	})
	const {
		data: managedRestaurant,
		isLoading: isLoadingManagedRestaurant,
		isSuccess: isManagedRestaurantSuccess
	} = useQuery({
		queryKey: ['managed-restaurant'],
		queryFn: getManagedRestaurant,
		staleTime: Infinity
	})
	const { mutateAsync: signOutFn, isPending: isSigningOut } = useMutation({
		mutationFn: signOut,
		onSuccess() {
			navigate({
				to: '/sign-in',
				replace: true
			})
		}
	})

	if (isLoadingProfile || isLoadingManagedRestaurant) {
		return <Skeleton className="h-8 w-28 rounded-md" />
	}

	if (!isProfileSuccess || !isManagedRestaurantSuccess) {
		return null
	}

	return (
		<Dialog>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="outline"
						className="flex items-center gap-2 select-none h-8 px-2"
					>
						{managedRestaurant.name}
						<ChevronDown className="w-4 h-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="lg:w-56">
					<DropdownMenuLabel className="flex flex-col">
						<span>{profile.name}</span>
						<span className="text-xs font-normal text-muted-foreground">
							{profile.name}
						</span>
					</DropdownMenuLabel>

					<DropdownMenuSeparator />

					<DialogTrigger asChild>
						<DropdownMenuItem>
							<Building className="w-4 h-4 mr-2" />
							<span>Perfil da loja</span>
						</DropdownMenuItem>
					</DialogTrigger>

					<DropdownMenuItem
						className="text-rose-500 dark:text-rose-400"
						onClick={() => signOutFn()}
						disabled={isSigningOut}
					>
						<LogOut className="w-4 h-4 mr-2" />
						<span>Sair</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<StoreProfileDialog />
		</Dialog>
	)
}
