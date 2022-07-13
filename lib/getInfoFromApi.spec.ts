import nock from 'nock'
import { getInfoFromApi } from './getInfoFromApi'

beforeAll(async () => {
	const scope = nock('https://www.strava.com/api/v3/clubs')
	scope.get('/838205').reply(200, {
		member_count: 150,
	})
	scope.get('/838205/activities').reply(200, [
		{
			distance: 100.0,
			moving_time: 2588,
			elapsed_time: 2588,
		},
	])
})

describe('getMemberCount', () => {
	it('should resolve an club ID into a member count', async () => {
		expect(
			await getInfoFromApi('https://www.strava.com/api/v3/clubs/838205'),
		).toMatchObject({
			data: {
				member_count: 150,
			},
		})
	})
})

describe('getActivities', () => {
	it('should give an array of activities for the club given', async () => {
		expect(
			await getInfoFromApi(
				'https://www.strava.com/api/v3/clubs/838205/activities',
			),
		).toMatchObject({
			data: [
				{
					distance: 100.0,
					moving_time: 2588,
					elapsed_time: 2588,
				},
			],
		})
	})
})
