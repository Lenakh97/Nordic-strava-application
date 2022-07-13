import { fetchTimeStamp } from './lib/fetchTimestamp.js'
import { getInfoFromApi } from './lib/getInfoFromApi.js'
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
	const startTimeStamp = 1657521789
	const weekTwoTimestamp = startTimeStamp + 1 //+ 604800
	const weekThreeTimestamp = weekTwoTimestamp + 604800
	const weekFourTimestamp = weekThreeTimestamp + 604800
	const weekFiveTimestamp = weekFourTimestamp + 604800
	const timeStamp = await fetchTimeStamp()
	const CLIENT_ID = `${process.env.CLIENT_ID}`
	const CLIENT_SECRET = `${process.env.CLIENT_SECRET}`
	let REFRESH_TOKEN = `${process.env.REFRESH_TOKEN}`
	const res = await postInfoToApi(
		`https://www.strava.com/api/v3/oauth/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=refresh_token&refresh_token=${REFRESH_TOKEN}`,
	)
	REFRESH_TOKEN = res.data.refresh_token
	const accessToken: string = res.data.access_token
	const JSONWeeklySummary = []
	let totalClubDistance = 0
	let totalClubHours = 0
	let totalClubPoints = 0
	const weekly_summary = []
	for (const team of teamList) {
		const clubInfo = await getInfoFromApi(
			`https://www.strava.com/api/v3/clubs/${team}?access_token=${accessToken}`,
		)
		const clubActivities = await getInfoFromApi(
			`https://www.strava.com/api/v3/clubs/${team}/activities?access_token=${accessToken}&per_page=200&after=${timeStamp}`,
		)
		let clubDistance = 0
		let clubTotalHours = 0
		let clubPoints = 0
		let clubElevation = 0
		const memberCount = clubInfo.data.member_count
		for (const activity in clubActivities.data) {
			clubTotalHours += clubActivities.data[activity].elapsed_time / 60
			clubElevation += clubActivities.data[activity].total_elevation_gain
			if (clubActivities.data[activity].type === 'Ride') {
				clubDistance += clubActivities.data[activity].distance / 3
			} else if (clubActivities.data[activity].type === 'VirtualRide') {
				clubDistance += clubActivities.data[activity].distance / 3
			} else if (clubActivities.data[activity].type === 'EBikeRide') {
				clubDistance += clubActivities.data[activity].distance / 3
			} else if (clubActivities.data[activity].type === 'RollerSki') {
				clubDistance += clubActivities.data[activity].distance / 3
			} else if (clubActivities.data[activity].type === 'Swim') {
				clubDistance += clubActivities.data[activity].distance * 4
			} else if (clubActivities.data[activity].type === 'Snowboard') {
				clubDistance += 0
			} else if (clubActivities.data[activity].type === 'AlpineSki') {
				clubDistance += 0
			} else {
				clubDistance += clubActivities.data[activity].distance
			}
		}
		clubPoints += clubDistance / 1000 / memberCount
		JSONWeeklySummary.push({
			name: clubInfo.data.name,
			distance: roundNumbers(clubDistance / 1000),
			hours: roundNumbers(clubTotalHours),
			clubPoints: roundNumbers(clubPoints),
			elevation: roundNumbers(clubElevation),
		})
		totalClubDistance += clubDistance / 1000
		totalClubHours += clubTotalHours
		totalClubPoints += clubPoints
	}
	if (timeStamp > weekFiveTimestamp) {
		weekly_summary.push({
			weekNumber: 5,
			updates: JSONWeeklySummary,
		})
	} else if (timeStamp > weekFourTimestamp) {
		weekly_summary.push({
			weekNumber: 4,
			updates: JSONWeeklySummary,
		})
	} else if (timeStamp > weekThreeTimestamp) {
		weekly_summary.push({
			weekNumber: 3,
			updates: JSONWeeklySummary,
		})
	} else if (timeStamp > weekTwoTimestamp) {
		weekly_summary.push({
			weekNumber: 2,
			updates: JSONWeeklySummary,
		})
	} else if (timeStamp > startTimeStamp) {
		weekly_summary.push({
			weekNumber: 1,
			updates: JSONWeeklySummary,
		})
	}

	return {
		timestamp: Date.now(),
		totalData: {
			totalDistance: roundNumbers(totalClubDistance),
			totalHours: roundNumbers(totalClubHours),
			totalPoints: roundNumbers(totalClubPoints),
		},
		weekly_summary: weekly_summary,
	}
}

const roundNumbers = (num: number) => {
	const newNum = Math.round(num * 10) / 10
	return newNum
}
