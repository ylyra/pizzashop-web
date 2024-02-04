import { api } from '@/lib/axios'

export type RegisterRestaurantBody = {
	email: string
	restaurant_name: string
	manager_name: string
	phone: string
}

export async function registerRestaurant({
	email,
	manager_name,
	phone,
	restaurant_name
}: RegisterRestaurantBody) {
	await api.post('/restaurants', {
		email,
		managerName: manager_name,
		restaurantName: restaurant_name,
		phone
	})
}
