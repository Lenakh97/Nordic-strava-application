import nock from 'nock'
import { getInfoFromApi } from './getInfoFromApi'

describe('getInfoFromApi()', () => {
	it('should return a response from a GET request', async () => {
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
		expect(
			await getInfoFromApi('https://www.strava.com/api/v3/clubs/838205'),
		).toMatchObject({
			data: {
				member_count: 150,
			},
		})
	})

	it('should throw an exception otherwise', async () => {
		const scope = nock('https://www.strava.com/api/v3/clubs')
		scope.get('/838205').reply(404, {
			message: 'Record Not Found',
			errors: [
				{
					resource: 'Club',
					field: 'id',
					code: 'invalid',
				},
			],
		})

		await expect(
			getInfoFromApi('https://www.strava.com/api/v3/clubs/838205'),
		).rejects.toThrow(/Request failed with status code 404/)
	})
})
