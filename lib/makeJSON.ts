import { clubDataObject, StravaObject } from '../getStravaData.js'
import { getInfoFromApi } from './getInfoFromApi.js'
import { roundNumbers } from './roundNumbers.js'

export const makeJSON = async (
	teamList: number[],
	accessToken: string,
	timeStamp: number,
): Promise<StravaObject> => {
	const JSONWeeklySummary: clubDataObject[] = []
	let totalClubDistance = 0
	let totalClubHours = 0
	let totalClubPoints = 0
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
			//Time in hours
			clubTotalHours += clubActivities.data[activity].elapsed_time / 60 / 60
			clubElevation += clubActivities.data[activity].total_elevation_gain
			const activityType = clubActivities.data[activity].type
			const activities3 = [
				'Ride',
				'VirtualRide',
				'EBikeRide',
				'RollerSki',
				'NordicSki',
				'BackCountrySki',
				'MountainBikeRide',
			]

			if (activities3.includes(activityType)) {
				clubDistance += clubActivities.data[activity].distance / 3
			} else if (activityType === 'Swim') {
				clubDistance += clubActivities.data[activity].distance * 4
			} else if (activityType === 'Snowboard') {
				clubDistance += 0
			} else if (activityType === 'AlpineSki') {
				clubDistance += 0
			} else {
				clubDistance += clubActivities.data[activity].distance
			}
		}
		clubPoints += clubDistance / 1000 / memberCount
		JSONWeeklySummary.push({
			name: clubInfo.data.name,
			distance: roundNumbers(clubDistance / 1000),
			hours: clubTotalHours / memberCount,
			clubPoints: roundNumbers(clubPoints),
			elevation: roundNumbers(clubElevation),
		})
		totalClubDistance += clubDistance / 1000
		totalClubHours += clubTotalHours
		totalClubPoints += clubPoints
	}
	return {
		timestamp: Math.round(Date.now() / 1000),
		totalData: {
			totalDistance: roundNumbers(totalClubDistance),
			totalHours: totalClubHours,
			totalPoints: roundNumbers(totalClubPoints),
		},
		summary: JSONWeeklySummary,
	}
}
