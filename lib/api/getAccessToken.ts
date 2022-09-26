import { postInfoToApi } from '../postInfoToApi'

export const getAccessToken = async (): Promise<string> => {
	const CLIENT_ID = `${process.env.CLIENT_ID}`
	const CLIENT_SECRET = `${process.env.CLIENT_SECRET}`
	const REFRESH_TOKEN = `${process.env.REFRESH_TOKEN}`
	const res = await postInfoToApi(
		`https://www.strava.com/api/v3/oauth/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=refresh_token&refresh_token=${REFRESH_TOKEN}`,
	)
	const accessToken: string = res.data.access_token
	return accessToken
}
