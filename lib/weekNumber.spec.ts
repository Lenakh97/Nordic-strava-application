import { weekNumber } from './weekNumber'

describe('weekNumber', () => {
	it('should give the current week', () => {
		const dateInWeek39 = new Date('2022-09-26T09:49:13.236Z')
		expect(weekNumber(dateInWeek39)).toEqual(39)
	})
})
