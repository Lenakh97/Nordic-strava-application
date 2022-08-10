export const roundNumbers = (num: number): number => {
	const newNum = Math.round(num * 10) / 10
	return newNum
}
