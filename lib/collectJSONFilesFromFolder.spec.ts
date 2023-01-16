import * as path from 'path'
import { collectJSONFilesFromFolder } from './collectJSONFilesFromFolder'

describe('collectJSONFilesFromFolder()', () => {
	it('should summarize all club data', async () => {
		const JSONdataArray = await collectJSONFilesFromFolder({
			folderPath: path.join(
				process.cwd(),
				'test-data',
				'collectJSONFilesFromFolder',
				'withData',
			),
		})

		expect(JSONdataArray).toMatchObject([
			{
				summary: [
					{
						clubPoints: 0,
						distance: 0,
						elevation: 0,
						hours: 0,
						name: 'Nordic Semiconductor - Finland',
					},
					{
						clubPoints: 0,
						distance: 0,
						elevation: 0,
						hours: 0,
						name: 'Nordic Semiconductor - Poland',
					},
					{
						clubPoints: 0,
						distance: 0,
						elevation: 0,
						hours: 0,
						name: 'Nordic Semiconductor - Europe',
					},
					{
						clubPoints: 0.2565805970149254,
						distance: 17.190900000000003,
						elevation: 358.2,
						hours: 0.042549751243781096,
						name: 'Nordic Semiconductor - APAC',
					},
					{
						clubPoints: 0.2543746031746032,
						distance: 5.341866666666667,
						elevation: 145.9,
						hours: 0.038492063492063494,
						name: 'Nordic Semiconductor - USA',
					},
					{
						clubPoints: 0,
						distance: 0,
						elevation: 0,
						hours: 0,
						name: 'Nordic Semiconductor - Trondheim Office',
					},
					{
						clubPoints: 0,
						distance: 0,
						elevation: 0,
						hours: 0,
						name: 'Omega NTNU',
					},
					{
						clubPoints: 0,
						distance: 0,
						elevation: 0,
						hours: 0,
						name: 'Nordic Semiconductor - Oslo Office',
					},
				],
				timestamp: 1664160540,
				totalData: {
					totalDistance: 22.53276666666667,
					totalHours: 3.6591666666666667,
					totalPoints: 0.5109552001895286,
				},
			},
			{
				summary: [
					{
						clubPoints: 0.01323,
						distance: 0.9261,
						elevation: 3.5,
						hours: 0.0011944444444444444,
						name: 'Nordic Semiconductor - Finland',
					},
					{
						clubPoints: 0.24047261904761905,
						distance: 6.733233333333334,
						elevation: 212,
						hours: 0.06209325396825396,
						name: 'Nordic Semiconductor - Poland',
					},
					{
						clubPoints: 0,
						distance: 0,
						elevation: 0,
						hours: 0,
						name: 'Nordic Semiconductor - Europe',
					},
					{
						clubPoints: 0,
						distance: 0,
						elevation: 0,
						hours: 0,
						name: 'Nordic Semiconductor - APAC',
					},
					{
						clubPoints: 0,
						distance: 0,
						elevation: 0,
						hours: 0,
						name: 'Nordic Semiconductor - USA',
					},
					{
						clubPoints: 0,
						distance: 0,
						elevation: 0,
						hours: 0,
						name: 'Nordic Semiconductor - Trondheim Office',
					},
					{
						clubPoints: 0,
						distance: 0,
						elevation: 0,
						hours: 0,
						name: 'Omega NTNU',
					},
					{
						clubPoints: 0,
						distance: 0,
						elevation: 0,
						hours: 0.0048734177215189875,
						name: 'Nordic Semiconductor - Oslo Office',
					},
				],
				timestamp: 1664268233,
				totalData: {
					totalDistance: 7.6593333333333335,
					totalHours: 2.2072222222222218,
					totalPoints: 0.25370261904761904,
				},
			},
		])
	})
})
