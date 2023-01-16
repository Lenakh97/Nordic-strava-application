import { readFileSync } from 'fs'
import * as path from 'path'
import { summarizeStravaData } from './summarizeStravaData'

const loadData = (name: string) =>
	JSON.parse(
		readFileSync(
			path.join(
				process.cwd(),
				'test-data',
				'summarizeStravaData',
				`${name}.json`,
			),
			'utf8',
		),
	)

describe('summarizeStravaData()', () => {
	it('should summarize no data', () => {
		const summary = summarizeStravaData([])

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

	it('should summarize walking data', () => {
		const summary = summarizeStravaData([
			{
				info: {
					id: 838200,
					name: 'Nordic Semiconductor - Oslo Office',
					member_count: 80,
				},
				activities: [
					{
						distance: 1500,
						elapsed_time: 3600,
						total_elevation_gain: 15,
						type: 'Walk',
					},
				],
			},
		])

		const osloPoints = 1500 / 1000 / (80 - 1)
		const osloHours = 3600 / 60 / 60 / (80 - 1)

		expect(summary).toMatchObject({
			totalData: {
				totalDistance: 1.5,
				totalHours: 1,
				totalPoints: osloPoints,
			},
			summary: [
				{
					clubPoints: osloPoints,
					distance: 1.5,
					elevation: 15,
					hours: osloHours,
					name: 'Nordic Semiconductor - Oslo Office',
				},
			],
		})
		expect(summary.timestamp).toBeGreaterThan(1000000000)
		expect(summary.timestamp).toBeLessThanOrEqual(Math.ceil(Date.now() / 1000))
	})

	it.each([['Snowboard'], ['AlpineSki']])(
		'should give no points, but hours for %s',
		(type) =>
			expect(
				summarizeStravaData([
					{
						info: {
							id: 838200,
							name: 'Nordic Semiconductor - Oslo Office',
							member_count: 80,
						},
						activities: [
							{
								distance: 1500,
								elapsed_time: 3600,
								total_elevation_gain: 15,
								type,
							},
						],
					},
				]),
			).toMatchObject({
				totalData: {
					totalDistance: 0,
					totalHours: 1,
					totalPoints: 0,
				},
				summary: [
					{
						clubPoints: 0,
						distance: 0,
						elevation: 15,
						hours: 3600 / 60 / 60 / (80 - 1),
						name: 'Nordic Semiconductor - Oslo Office',
					},
				],
			}),
	)

	it('should summarize swimming data (4 times the distance)', () => {
		const summary = summarizeStravaData([
			{
				info: {
					id: 838200,
					name: 'Nordic Semiconductor - Oslo Office',
					member_count: 80,
				},
				activities: [
					{
						distance: 1500,
						elapsed_time: 3600,
						total_elevation_gain: 15,
						type: 'Swim',
					},
				],
			},
		])

		const osloPoints = (1500 * 4) / 1000 / (80 - 1)
		const osloHours = 3600 / 60 / 60 / (80 - 1)

		expect(summary).toMatchObject({
			totalData: {
				totalDistance: 1.5 * 4,
				totalHours: 1,
				totalPoints: osloPoints,
			},
			summary: [
				{
					clubPoints: osloPoints,
					distance: 1.5 * 4,
					elevation: 15,
					hours: osloHours,
					name: 'Nordic Semiconductor - Oslo Office',
				},
			],
		})
		expect(summary.timestamp).toBeGreaterThan(1000000000)
		expect(summary.timestamp).toBeLessThanOrEqual(Math.ceil(Date.now() / 1000))
	})

	it('should summarize Strava data for teams (using example data)', () => {
		const summary = summarizeStravaData([
			{
				info: loadData('clubinfo.838200'),
				activities: loadData('activities.838200'),
			},
			{
				info: loadData('clubinfo.838203'),
				activities: loadData('activities.838203'),
			},
		])

		expect(summary).toMatchObject({
			totalData: {
				totalDistance: 39.203559999999996,
				totalHours: 6.989722222222222,
				totalPoints: 0.3147104872903159,
			},
			summary: [
				{
					name: 'Nordic Semiconductor - Oslo Office',
					distance: 11.533033333333332,
					hours: 0.026972573839662447,
					clubPoints: 0.14598776371308014,
					elevation: 81.9,
				},
				{
					name: 'Nordic Semiconductor - Trondheim Office',
					distance: 27.670526666666664,
					hours: 0.02962737127371274,
					clubPoints: 0.16872272357723575,
					elevation: 511.2000000000001,
				},
			],
		})
		expect(summary.timestamp).toBeGreaterThan(1000000000)
		expect(summary.timestamp).toBeLessThanOrEqual(Math.ceil(Date.now() / 1000))
	})
})
