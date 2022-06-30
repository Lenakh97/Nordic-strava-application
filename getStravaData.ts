import { getInfoFromApi } from './lib/getInfoFromApi.js'
import { postInfoToApi } from './lib/postInfoToApi.js'

//Should I hide these? It's not possible to use them when you're not in the club
const teamList = [
	838205, 982093, 838211, 838207, 838209, 838203, 232813, 838200,
]

export type StravaObject = {
	timestamp: number
	weekly_summary: {
		name: string
		distance: number
		hours: number
		clubPoints: number
		elevation: number
	}[]
	totalData: { totalDistance: number; totalHours: number; totalPoints: number }
}

export const getStravaData = async (): Promise<StravaObject> => {
	//The next three lines needs to be hidden
	const CLIENT_ID = '87925'
	const CLIENT_SECRET = '9d5384df9ce4c2d9994b4e596c2e37e346803535'
	let REFRESH_TOKEN = '4d52e3eeab3ddf7f2694793b4e3ac20fbcb3f0eb'
	const res = await postInfoToApi(
		`https://www.strava.com/api/v3/oauth/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=refresh_token&refresh_token=${REFRESH_TOKEN}`,
	)
	REFRESH_TOKEN = res.data.refresh_token
	const accessToken: string = res.data.access_token
	const JSONWeeklySummary = []
	let totalClubDistance = 0
	let totalClubHours = 0
	let totalClubPoints = 0
	for (const team of teamList) {
		const clubInfo = await getInfoFromApi(
			`https://www.strava.com/api/v3/clubs/${team}?access_token=${accessToken}`,
		)
		const clubActivities = await getInfoFromApi(
			`https://www.strava.com/api/v3/clubs/${team}/activities?access_token=${accessToken}&per_page=200`,
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
			distance: clubDistance / 1000,
			hours: clubTotalHours,
			clubPoints: clubPoints,
			elevation: clubElevation,
		})
		totalClubDistance += clubDistance / 1000
		totalClubHours += clubDistance
		totalClubPoints += clubPoints
	}
	return {
		timestamp: Date.now(),
		weekly_summary: JSONWeeklySummary,
		totalData: {
			totalDistance: totalClubDistance,
			totalHours: totalClubHours,
			totalPoints: totalClubPoints,
		},
	}
}
