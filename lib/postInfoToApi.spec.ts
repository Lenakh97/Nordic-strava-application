import nock from 'nock'
import { postInfoToApi } from './postInfoToApi'

describe('postInfoToApi', () => {
	const CLIENT_ID = '1234'
	const CLIENT_SECRET = 'mysecret'
	const REFRESH_TOKEN = 'refresh token'

	beforeAll(async () => {
		const scope = nock('https://www.strava.com/api/v3/oauth')
		scope
			.post(
				`/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=refresh_token&refresh_token=${REFRESH_TOKEN}`,
			)
			.reply(200, {
				data: {
					access_token: 'token',
				},
			})
	})

	it('should get an access Token', async () => {
		const res = await postInfoToApi(
			`https://www.strava.com/api/v3/oauth/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=refresh_token&refresh_token=${REFRESH_TOKEN}`,
		)
		expect(res).toMatchObject({
			data: {
				// data key is from AxiosResponse
				data: {
					access_token: 'token',
				},
			},
		})
	})
})
