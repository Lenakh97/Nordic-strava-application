import { teamList } from './config.js'
import { getStartTimeStamp } from './getStartTimeStamp'
import { makeJSON } from './lib/makeJSON.js'

export type StravaObject = {
	timestamp: number
	totalData: { totalDistance: number; totalHours: number; totalPoints: number }
	summary: clubDataObject[]
}

export type clubDataObject = {
	name: string
	distance: number
	hours: number
	clubPoints: number
	elevation: number
}

export const getStravaData = async (): Promise<StravaObject> => {
	const startTimeStamp = await getStartTimeStamp({ dataFolder: './data' })
	/*
	USE THE TIMESTAMP AND FETCH DATA AFTER LAST FETCH
	*/
	console.log(
		`Timestamp used for fetching`,
		startTimeStamp,
		new Date(startTimeStamp * 1000),
	)
	return makeJSON(teamList, startTimeStamp)
}
