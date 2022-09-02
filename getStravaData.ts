import { startOfWeek } from 'date-fns'
import { readdir, readFile } from 'fs/promises'
import path from 'path'
import { makeJSON } from './lib/makeJSON.js'
import { postInfoToApi } from './lib/postInfoToApi.js'

const teamList = [
	838205, 982093, 838211, 838207, 838209, 838203, 232813, 838200,
]

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
	let startTimeStamp = undefined

	/*
	GOT THROUGH ALL FILES AND FIND THE TIMESTAMP OF THE LATEST FETCH
	*/
	const fileArray = await readdir('./data')
	const latestWeekFolder: string | undefined = fileArray
		.filter((folderName) => folderName.includes('week'))
		.sort((folderA, folderB) => folderB.localeCompare(folderA))[0] as
		| string
		| undefined

	console.log(`Latest week folder`, latestWeekFolder)
	if (latestWeekFolder === undefined) {
		startTimeStamp = startOfWeek(new Date()).getTime()
	} else {
		const weekDir = path.join(process.cwd(), 'data', latestWeekFolder)
		const allFilesInFolder = await readdir(weekDir)
		const latestJSONFile: string | undefined = allFilesInFolder
			.filter((fileName) => fileName.includes('.json'))
			.sort((fileA, fileB) => fileB.localeCompare(fileA))[0] as
			| string
			| undefined
		if (latestJSONFile === undefined) {
			startTimeStamp = startOfWeek(new Date()).getTime()
		} else {
			const JSONFilePath = path.join(weekDir, latestJSONFile)
			console.log(`Latest week file`, JSONFilePath)
			const rawData = await readFile(JSONFilePath)
			const JSONdata = JSON.parse(rawData.toString())
			if (JSONdata.timestamp === undefined) {
				throw new Error(`No timestamp in JSON file: ${JSONFilePath}`)
			}
			startTimeStamp = JSONdata.timestamp
		}
	}

	/*
	USE THE TIMESTAMP AND FETCH DATA AFTER LAST FETCH
	*/
	console.log(
		`Timestamp used for fetching`,
		startTimeStamp,
		new Date(startTimeStamp * 1000),
	)

	const JSONObject = await makeJSON(teamList, accessToken, startTimeStamp)

	return JSONObject
}
