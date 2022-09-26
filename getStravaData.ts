import { teamList } from './config.js'
import { getStartTimeStamp } from './getStartTimeStamp'
import { getAccessToken } from './lib/api/getAccessToken.js'
import { getInfoFromApi } from './lib/getInfoFromApi.js'
import { summarizeStravaData, Summary } from './lib/summarizeStravaData.js'

export type clubDataObject = {
	name: string
	distance: number
	hours: number
	clubPoints: number
	elevation: number
}

export const getStravaData = async ({
	clientId,
	clientSecret,
	refreshToken,
}: {
	clientId: string
	clientSecret: string
	refreshToken: string
}): Promise<Summary> => {
	const startTimeStamp = await getStartTimeStamp({
		dataFolder: './data',
	})
	/*
	USE THE TIMESTAMP AND FETCH DATA AFTER LAST FETCH
	*/
	console.log(
		`Timestamp used for fetching`,
		startTimeStamp,
		new Date(startTimeStamp * 1000),
	)

	const clubData: {
		info: {
			id: number
			name: string
			member_count: number
		}
		activities: {
			elapsed_time: number
			total_elevation_gain: number
			type: string
			distance: number
		}[]
	}[] = []

	const accessToken = await getAccessToken({
		clientId,
		clientSecret,
		refreshToken,
	})
	for (const team of teamList) {
		const clubInfo = await getInfoFromApi(
			`https://www.strava.com/api/v3/clubs/${team}?access_token=${accessToken}`,
		)
		const clubActivities = await getInfoFromApi(
			`https://www.strava.com/api/v3/clubs/${team}/activities?access_token=${accessToken}&per_page=200&after=${startTimeStamp}`,
		)
		clubData.push({
			activities: clubActivities.data as any,
			info: clubInfo.data as any,
		})
	}

	return summarizeStravaData(clubData)
}
