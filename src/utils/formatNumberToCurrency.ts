export const formatNumberToCurrency = (number: number) => {
	return number.toLocaleString('pt-BR', {
		style: 'currency',
		currency: 'BRL'
	})
}
