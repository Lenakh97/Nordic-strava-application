import nock from 'nock'
import { fetchTimeStamp } from './fetchTimestamp'

beforeAll(async () => {
	const scope = nock('https://lenakh97.github.io/Nordic-strava-application/')
	scope.get('/JSONObject.json?').reply(200, {
		timestamp: 1656570015367,
	})
})

describe('fetchTimestamp', () => {
	it('should fetch timestamp for latest update', async () => {
		expect(await fetchTimeStamp('JSONObject.json?')).toEqual({
			timestamp: 1656570015367,
		})
	})
})
