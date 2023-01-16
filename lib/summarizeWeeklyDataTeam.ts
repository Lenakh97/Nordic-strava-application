import { ClubInfo } from '../getStravaData'
import { Summary } from './summarizeStravaData'

export const summarizeWeeklyDataTeam = ({
	summaries,
}: {
	summaries: Summary[]
}): Summary => {
	const clubsInfo: Record<string, ClubInfo> = {}
	const weeklySummary: ClubInfo[] = []

	let totalClubDistance = 0
	let totalClubHours = 0
	let totalClubPoints = 0
	for (const summary of summaries) {
		totalClubDistance += summary.totalData.totalDistance
		totalClubHours += summary.totalData.totalHours
		totalClubPoints += summary.totalData.totalPoints

		for (const team of summary.summary) {
			if (clubsInfo[team.name] === undefined) {
				clubsInfo[team.name] = {
					name: team.name,
					distance: 0,
					hours: 0,
					clubPoints: 0,
					elevation: 0,
				}
			}
			clubsInfo[team.name].distance += team.distance
			clubsInfo[team.name].hours += team.hours
			clubsInfo[team.name].clubPoints += team.clubPoints
			clubsInfo[team.name].elevation += team.elevation
		}
	}
	for (const teamName in clubsInfo) {
		weeklySummary.push(clubsInfo[teamName])
	}
	return {
		timestamp: Math.round(Date.now() / 1000),
		totalData: {
			totalDistance: totalClubDistance,
			totalHours: totalClubHours,
			totalPoints: totalClubPoints,
		},
		summary: weeklySummary,
	}
}
