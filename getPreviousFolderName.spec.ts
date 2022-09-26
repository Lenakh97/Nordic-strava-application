import { getPreviousFolderName } from './getPreviousFolderName'

describe('getPreviousFolderName()', () => {
	it('should return the previous', () =>
		expect(getPreviousFolderName('week-40')).toEqual('week-39'))
	it('should handle the first week of the year', () =>
		expect(() => getPreviousFolderName('week-1')).toThrow(
			/Strava challenge does not run in Winter!/,
		))
})
