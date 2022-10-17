import { summarizeWeeklyDataTeam } from './summarizeWeeklyDataTeam'

describe('summarizeWeeklyDataTeam()', () => {
	it('should summarize all club data', () => {
		const JSONdataArray = [
			{
				timestamp: 1664160540,
				totalData: {
					totalDistance: 22.53276666666667,
					totalHours: 3.6591666666666667,
					totalPoints: 0.5109552001895286,
				},
				summary: [
					{
						name: 'Nordic Semiconductor - Finland',
						distance: 0,
						hours: 0,
						clubPoints: 0,
						elevation: 0,
					},
					{
						name: 'Nordic Semiconductor - Poland',
						distance: 0,
						hours: 0,
						clubPoints: 0,
						elevation: 0,
					},
					{
						name: 'Nordic Semiconductor - Europe',
						distance: 0,
						hours: 0,
						clubPoints: 0,
						elevation: 0,
					},
				],
			},
			{
				timestamp: 1664268233,
				totalData: {
					totalDistance: 7.6593333333333335,
					totalHours: 2.2072222222222218,
					totalPoints: 0.25370261904761904,
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
				],
			},
		]
		const summary = summarizeWeeklyDataTeam({ summaries: JSONdataArray })
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
			],
		})
		expect(summary.timestamp).toBeGreaterThan(1000000000)
		expect(summary.timestamp).toBeLessThanOrEqual(Math.ceil(Date.now() / 1000))
	})
	it('should summarize no data', async () => {
		const JSONdataArray = [
			{
				timestamp: 1664160540,
				totalData: {
					totalDistance: 0,
					totalHours: 0,
					totalPoints: 0,
				},
				summary: [],
			},
		]

		const summary = summarizeWeeklyDataTeam({ summaries: JSONdataArray })

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
