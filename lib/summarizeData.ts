import { readdir } from 'node:fs/promises'
import { clubDataObject } from '../getStravaData'
import { readFileFromFolder } from './readFileFromFolder'
import { Summary } from './summarizeStravaData'

export const summarizeData = async ({
	folderPath,
}: {
	folderPath: string
}): Promise<Summary> => {
	const fileArray = await readdir(folderPath)
	const clubDictionary: { [name: string]: clubDataObject } = {}
	let totalClubDistance = 0
	let totalClubHours = 0
	let totalClubPoints = 0
	const weekly_summary: clubDataObject[] = []
	for (const files of fileArray) {
		const JSONdata = await readFileFromFolder({ folderPath, files })

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
