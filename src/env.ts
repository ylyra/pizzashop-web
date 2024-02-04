import { boolean, coerce, object, optional, parse, string, url } from 'valibot'

const envSchema = object({
	VITE_API_URL: string([url()]),
	VITE_ENABLE_API_DELAY: optional(
		coerce(boolean(), (value) => value === 'true'),
		false
	)
})

export const env = parse(envSchema, import.meta.env)
