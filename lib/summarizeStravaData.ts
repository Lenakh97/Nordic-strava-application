import { clubDataObject } from '../getStravaData.js'

export type Summary = {
	/**
	 * Unix timestamp in seconds of summary generation
	 */
	timestamp: number
	totalData: {
		/**
		 * in kilometers
		 */
		totalDistance: number
		totalHours: number
		totalPoints: number
	}
	summary: clubDataObject[]
}

export const summarizeStravaData = (
	clubData: {
		info: {
			id: number
			name: string
			member_count: number
		}
		activities: {
			/** In seconds */
			elapsed_time: number
			total_elevation_gain: number
			type: string
			/**
			 * Distance in meters
			 */
			distance: number
		}[]
	}[],
): Summary => {
	const JSONWeeklySummary: clubDataObject[] = []
	let totalClubDistance = 0
	let totalClubHours = 0
	let totalClubPoints = 0
	for (const { info: clubInfo, activities: clubActivities } of clubData) {
		let clubDistance = 0
		let clubTotalHours = 0
		let clubPoints = 0
		let clubElevation = 0
		// Reduce 1 to account for "Strava Lena" account
		const memberCount = clubInfo.member_count - 1
		for (const activity of clubActivities) {
			//Time in hours
			clubTotalHours += activity.elapsed_time / 60 / 60
			clubElevation += activity.total_elevation_gain
			const activityType = activity.type
			const activities3 = [
				'Ride',
				'VirtualRide',
				'RollerSki',
				'NordicSki',
				'BackCountrySki',
				'MountainBikeRide',
				'GravelRide',
			]

			if (activities3.includes(activityType)) {
				// Every 3 km of these activities count for 1 km of effective distance
				clubDistance += activity.distance / 3
			} else if (activityType === 'Swim') {
				// Every 1 km of swim counts as 4 km of effective distance
				clubDistance += activity.distance * 4
			} else if (activityType === 'EBikeRide') {
				// Every 5 km of EBikeRide counts as 1 km of effective distance
				clubDistance += activity.distance / 5
			} else if (activityType === 'Snowboard') {
				clubDistance += 0
			} else if (activityType === 'AlpineSki') {
				clubDistance += 0
			} else {
				clubDistance += activity.distance
			}
		}
		clubPoints += clubDistance / 1000 / memberCount
		JSONWeeklySummary.push({
			name: clubInfo.name,
			distance: clubDistance / 1000,
			hours: clubTotalHours / memberCount,
			clubPoints: clubPoints,
			elevation: clubElevation,
		})
		totalClubDistance += clubDistance / 1000
		totalClubHours += clubTotalHours
		totalClubPoints += clubPoints
	}
	return {
		timestamp: Math.round(Date.now() / 1000),
		totalData: {
			totalDistance: totalClubDistance,
			totalHours: totalClubHours,
			totalPoints: totalClubPoints,
		},
		summary: JSONWeeklySummary,
	}
}
