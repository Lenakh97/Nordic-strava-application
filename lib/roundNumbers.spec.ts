import { roundNumbers } from './roundNumbers'

describe('roundNumbers()', () => {
	const number1 = roundNumbers(15.324234)
	const number2 = roundNumbers(1.18321423)
	it('should return a number with one decimal', () =>
		expect(number1).toEqual(15.3))
	it('should return a number with one decimal', () =>
		expect(number2).toEqual(1.2))
})
