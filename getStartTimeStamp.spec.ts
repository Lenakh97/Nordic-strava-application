import { startOfDay, startOfWeek } from 'date-fns'
import * as path from 'path'
import { getStartTimeStamp } from './getStartTimeStamp'

// FIXME: Now is week 40 (actually 39)
const now = new Date('2022-09-26T09:49:13.236Z')

const dataFolder = (name: string) =>
	path.join(process.cwd(), 'test-data', 'getStartTimeStamp', name)

describe('getStartTimeStamp()', () => {
	it('should return the latest timestamp based on the Strava data', async () =>
		expect(
			await getStartTimeStamp({
				dataFolder: dataFolder('multiple-weeks'),
				now,
			}),
		).toEqual(1664178000))

	it('should return midnight of today if there is no previous data', async () => {
		const midnightOfToday = startOfDay(now).getTime()
		expect(
			await getStartTimeStamp({
				dataFolder: dataFolder('blank'),
				now,
			}),
		).toEqual(midnightOfToday)
	})

	it('should return midnight of today if the JSON does not contain a timestamp', async () => {
		const midnightOfToday = startOfDay(now).getTime()
		expect(
			await getStartTimeStamp({
				dataFolder: dataFolder('invalid-json'),
				now,
			}),
		).toEqual(midnightOfToday)
	})

	it('should return start of the week if the week folder exists, but has not data', async () => {
		const startOfTheWeek = startOfWeek(now).getTime()
		expect(
			await getStartTimeStamp({
				dataFolder: dataFolder('no-json-in-week-folder'),
				now,
			}),
		).toEqual(startOfTheWeek)
	})

	it('should return the timestamp from last week, if the current week folder is empty', async () =>
		expect(
			await getStartTimeStamp({
				dataFolder: dataFolder('current-week-empty'),
				now,
			}),
		).toEqual(1664148498))

	it('should not go back beyond week 1', async () =>
		expect(
			getStartTimeStamp({
				dataFolder: dataFolder('new-year'),
				now,
			}),
		).rejects.toThrow(/Strava challenge does not run in Winter!/))
})
