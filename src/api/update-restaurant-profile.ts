import { api } from '@/lib/axios'

type UpdateRestaurantProfileBody = {
	name: string
	description: string
}

export async function updateRestaurantProfile({
	description,
	name
}: UpdateRestaurantProfileBody) {
	await api.put('/profile', {
		description,
		name
	})
}
