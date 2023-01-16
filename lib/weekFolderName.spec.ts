import { weekFolderName } from './weekFolderName'
describe('Week Number Folder ', () => {
	it.each([
		['2022-09-26T09:49:13.236Z', 'week-39'],
		// should prefix single-digit weeks with a zero
		['2022-02-05T09:49:13.236Z', 'week-05'],
		['2022-01-04T09:49:13.236Z', 'week-01'],
		['2022-12-31T09:49:13.236Z', 'week-52'],
	])(
		'should return the folder name %s for the date %s',
		(date, expectedFolder) => {
			const weekNumber = weekFolderName(new Date(date))
			expect(weekNumber).toEqual(expectedFolder)
		},
	)
})
