//import { fetchData } from './lib/fetchData.js'
//import { getWeek } from './lib/getWeek.js'
import { makeinitialJSON } from './lib/makeInitialJSON.js'
//import { modifyJSON } from './lib/modifyJSON.js'
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
	//REFRESH_TOKEN = res.data.refresh_token
	const accessToken: string = res.data.access_token

	/*
	FIRST OF ALL WE MIGHT HAVE NO DATA, MAKE INITIAL REQUEST
	*/
	const startTimeStamp = 1659304800
	//const fetchingTimestamp = Math.round(Date.now() / 1000)
	const JSONObject = await makeinitialJSON(teamList, accessToken, startTimeStamp)

	/*
	FIGURE OUT WHICH WEEK IT IS
	*/
	//const currentWeek = getWeek(startTimeStamp, fetchingTimestamp)
	return JSONObject

}
