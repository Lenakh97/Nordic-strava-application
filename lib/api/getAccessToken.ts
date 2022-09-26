import { postInfoToApi } from '../postInfoToApi'

export const getAccessToken = async ({
	clientId,
	clientSecret,
	refreshToken,
}: {
	clientId: string
	clientSecret: string
	refreshToken: string
}): Promise<string> => {
	const res = await postInfoToApi(
		`https://www.strava.com/api/v3/oauth/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=refresh_token&refresh_token=${refreshToken}`,
	)
	return res.data.access_token as string
}
