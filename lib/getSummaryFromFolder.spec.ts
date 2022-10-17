import * as path from 'path'
import { getSummaryFromFolder } from './getSummaryFromFolder'
import { readFileFromFolder } from './readFileFromFolder'
import { summarizeWeeklyDataTeam } from './summarizeWeeklyDataTeam'

describe('getSummaryFromFolder()', () => {
	it('should summarize all club data', async () => {
		const JSONdataArray = await readFileFromFolder({
			folderPath: path.join(
				process.cwd(),
				'test-data',
				'getSummaryFromFolder',
				'withData',
			),
		})

		const summary = summarizeWeeklyDataTeam({ JSONdataArray })

		expect(summary).toMatchObject({
			totalData: {
				totalDistance: 30.192100000000003,
				totalHours: 5.866388888888888,
				totalPoints: 0.7646578192371476,
			},
			summary: [
				{
					name: 'Nordic Semiconductor - Finland',
					distance: 0.9261,
					hours: 0.0011944444444444444,
					clubPoints: 0.01323,
					elevation: 3.5,
				},
				{
					name: 'Nordic Semiconductor - Poland',
					distance: 6.733233333333334,
					hours: 0.06209325396825396,
					clubPoints: 0.24047261904761905,
					elevation: 212,
				},
				{
					name: 'Nordic Semiconductor - Europe',
					distance: 0,
					hours: 0,
					clubPoints: 0,
					elevation: 0,
				},
				{
					name: 'Nordic Semiconductor - APAC',
					distance: 17.190900000000003,
					hours: 0.042549751243781096,
					clubPoints: 0.2565805970149254,
					elevation: 358.2,
				},
				{
					name: 'Nordic Semiconductor - USA',
					distance: 5.341866666666667,
					hours: 0.038492063492063494,
					clubPoints: 0.2543746031746032,
					elevation: 145.9,
				},
				{
					name: 'Nordic Semiconductor - Trondheim Office',
					distance: 0,
					hours: 0,
					clubPoints: 0,
					elevation: 0,
				},
				{
					name: 'Omega NTNU',
					distance: 0,
					hours: 0,
					clubPoints: 0,
					elevation: 0,
				},
				{
					name: 'Nordic Semiconductor - Oslo Office',
					distance: 0,
					hours: 0.0048734177215189875,
					clubPoints: 0,
					elevation: 0,
				},
			],
		})
		expect(summary.timestamp).toBeGreaterThan(1000000000)
		expect(summary.timestamp).toBeLessThanOrEqual(Math.ceil(Date.now() / 1000))
	})
	it('should summarize no data', async () => {
		const summary = await getSummaryFromFolder({
			folderPath: path.join(
				process.cwd(),
				'test-data',
				'getSummaryFromFolder',
				'noData',
			),
		})

		expect(summary).toMatchObject({
			totalData: {
				totalDistance: 0,
				totalHours: 0,
				totalPoints: 0,
			},
			summary: [],
		})
		expect(summary.timestamp).toBeGreaterThan(1000000000)
		expect(summary.timestamp).toBeLessThanOrEqual(Math.ceil(Date.now() / 1000))
	})
})
