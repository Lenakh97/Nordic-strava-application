import { getStravaData } from './getStravaData'

const CLIENT_ID = '1234'
const CLIENT_SECRET = 'mysecret'
const REFRESH_TOKEN = 'refreshtoken'

describe.skip('getStravaData()', () => {
	it('should call the Strava API and return a summary', async () => {
		const res = await getStravaData({
			clientId: CLIENT_ID,
			clientSecret: CLIENT_SECRET,
			refreshToken: REFRESH_TOKEN,
		})

		// Depends on the time of day (Date.now()),
		// Timestamp property depends on previous of the function
		expect(res).toMatchObject({
			timestamp: 1664178000,
			totalData: {
				totalDistance: 25.765633333333334,
				totalHours: 3.841388888888889,
				totalPoints: 0.1820679335185757,
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
				{
					name: 'Nordic Semiconductor - APAC',
					distance: 0,
					hours: 0,
					clubPoints: 0,
					elevation: 0,
				},
				{
					name: 'Nordic Semiconductor - USA',
					distance: 0,
					hours: 0,
					clubPoints: 0,
					elevation: 0,
				},
				{
					name: 'Nordic Semiconductor - Trondheim Office',
					distance: 2.8556,
					hours: 0.0057825203252032525,
					clubPoints: 0.01741219512195122,
					elevation: 105,
				},
				{
					name: 'Omega NTNU',
					distance: 13.6097,
					hours: 0.0039980842911877396,
					clubPoints: 0.04693,
					elevation: 68.10000000000001,
				},
				{
					name: 'Nordic Semiconductor - Oslo Office',
					distance: 9.300333333333333,
					hours: 0.021944444444444447,
					clubPoints: 0.11772573839662447,
					elevation: 70.4,
				},
			],
		})
	})
})
