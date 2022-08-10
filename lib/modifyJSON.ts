import { StravaObject } from '../getStravaData.js'
import { getInfoFromApi } from './getInfoFromApi.js'
import { roundNumbers } from './roundNumbers.js'

export const modifyJSON = async (
	fetchedData: StravaObject,
	weekNumber: number,
	teamList: number[],
	accessToken: string,
): Promise<StravaObject> => {
	const JSONWeeklySummary = []
	let totalClubDistance = fetchedData.totalData.totalDistance
	let totalClubHours = fetchedData.totalData.totalHours
	let totalClubPoints = fetchedData.totalData.totalPoints
	const weekly_summary = fetchedData.weekly_summary
	//Check if there is data in last week, if so we can add data to weekly_summary
	//if (weekly_summary.length === (weekNumber-1)){
	for (const team of teamList) {
		const clubInfo = await getInfoFromApi(
			`https://www.strava.com/api/v3/clubs/${team}?access_token=${accessToken}`,
		)
		const clubActivities = await getInfoFromApi(
			`https://www.strava.com/api/v3/clubs/${team}/activities?access_token=${accessToken}&per_page=200&after=${fetchedData.timestamp}`,
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
	weekly_summary.push({
		weekNumber: weekNumber,
		updates: JSONWeeklySummary,
	})
	//}
	//else return

	return {
		timestamp: Math.round(Date.now() / 1000),
		totalData: {
			totalDistance: roundNumbers(totalClubDistance),
			totalHours: roundNumbers(totalClubHours),
			totalPoints: roundNumbers(totalClubPoints),
		},
		weekly_summary: weekly_summary,
	}
}
