import nock from 'nock'
import { getAccessToken } from './getAccessToken'

describe('getAccessToken', () => {
	const CLIENT_ID = '1234'
	const CLIENT_SECRET = 'mysecret'
	const REFRESH_TOKEN = 'refreshtoken'

	it('should return an access token on status 200', async () => {
		const scope = nock('https://www.strava.com/api/v3/oauth')
		scope
			.post(
				`/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=refresh_token&refresh_token=${REFRESH_TOKEN}`,
			)
			.reply(200, {
				access_token: 'token',
			})
		const res = await getAccessToken({
			clientId: CLIENT_ID,
			clientSecret: CLIENT_SECRET,
			refreshToken: REFRESH_TOKEN,
		})
		expect(res).toEqual('token')
	})

	it('should throw an exception otherwise', async () => {
		const scope = nock('https://www.strava.com/api/v3/oauth')
		scope
			.post(
				`/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=refresh_token&refresh_token=${REFRESH_TOKEN}`,
			)
			.reply(400, {
				errors: [
					{
						code: 'unauthenticated',
					},
				],
				message: 'unauthenticated',
			})

		await expect(
			getAccessToken({
				clientId: CLIENT_ID,
				clientSecret: CLIENT_SECRET,
				refreshToken: REFRESH_TOKEN,
			}),
		).rejects.toThrow(/Request failed with status code 400/)
	})
})
