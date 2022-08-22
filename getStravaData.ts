import { findLatestTimestamp } from './lib/findLatestTimestamp.js'
import { getWeek } from './lib/getWeek.js'
import { makeJSON } from './lib/makeJSON.js'
import { postInfoToApi } from './lib/postInfoToApi.js'

const teamList = [
	838205, 982093, 838211, 838207, 838209, 838203, 232813, 838200,
]

export type StravaObject = {
	timestamp: number
	totalData: { totalDistance: number; totalHours: number; totalPoints: number }
	weekly_summary: {
		weekNumber: number
		updates: {
			name: string
			distance: number
			hours: number
			clubPoints: number
			elevation: number
		}[]
	}[]
}

export const getStravaData = async (): Promise<StravaObject> => {
	/*
	INITIAL CODE - GET ACCESS TOKEN TO MAKE REQUESTS
	*/
	const CLIENT_ID = `${process.env.CLIENT_ID}`
	const CLIENT_SECRET = `${process.env.CLIENT_SECRET}`
	const REFRESH_TOKEN = `${process.env.REFRESH_TOKEN}`
	const res = await postInfoToApi(
		`https://www.strava.com/api/v3/oauth/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=refresh_token&refresh_token=${REFRESH_TOKEN}`,
	)
	const accessToken: string = res.data.access_token
	//1.august 2022
	const startTimeStamp = 1659346442

	/*
	GOT THROUGH ALL FILES AND FIND THE TIMESTAMP OF THE LATEST FETCH
	*/
	const latestUsedTimestamp = await findLatestTimestamp()

	/*
	USE THE TIMESTAMP AND FETCH DATA AFTER LAST FETCH
	*/
	const JSONObject = await makeJSON(teamList, accessToken, latestUsedTimestamp)

	/*
	FIGURE OUT WHICH WEEK IT IS
	*/
	const currentWeek = getWeek(startTimeStamp, latestUsedTimestamp)
	console.log(currentWeek)
	return JSONObject
}
