import { clubDataObject } from '../getStravaData'
import { Summary } from './summarizeStravaData'

export const summarizeWeeklyDataTeam = ({
	JSONdataArray,
}: {
	JSONdataArray: Summary[]
}): Summary => {
	const clubDictionary: { [name: string]: clubDataObject } = {}
	const weekly_summary: clubDataObject[] = []

	let totalClubDistance = 0
	let totalClubHours = 0
	let totalClubPoints = 0
	for (const JSONdata of JSONdataArray) {
		totalClubDistance += JSONdata.totalData.totalDistance
		totalClubHours += JSONdata.totalData.totalHours
		totalClubPoints += JSONdata.totalData.totalPoints

		for (const team of JSONdata.summary) {
			if (clubDictionary[team.name] === undefined) {
				clubDictionary[team.name] = {
					name: team.name,
					distance: 0,
					hours: 0,
					clubPoints: 0,
					elevation: 0,
				}
			}
			clubDictionary[team.name].distance += team.distance
			clubDictionary[team.name].hours += team.hours
			clubDictionary[team.name].clubPoints += team.clubPoints
			clubDictionary[team.name].elevation += team.elevation
		}
	}
	for (const teamName in clubDictionary) {
		weekly_summary.push(clubDictionary[teamName])
	}
	return {
		timestamp: Math.round(Date.now() / 1000),
		totalData: {
			totalDistance: totalClubDistance,
			totalHours: totalClubHours,
			totalPoints: totalClubPoints,
		},
		summary: weekly_summary,
	}
}
