import * as fs from 'fs'
import { readdir } from 'node:fs/promises'
import { clubDataObject, StravaObject } from '../getStravaData'
import { roundNumbers } from './roundNumbers.js'

const summarizeData = async (): Promise<StravaObject> => {
	const fileArray = await readdir('./data/public')
	const clubDictionary: { [name: string]: clubDataObject } = {}
	let totalClubDistance = 0
	let totalClubHours = 0
	let totalClubPoints = 0
	const weekly_summary: clubDataObject[] = []
	for (const files of fileArray) {
		const rawData = fs.readFileSync(`./data/public/${files}`)
		const JSONdata = JSON.parse(rawData.toString())
		totalClubDistance += JSONdata.totalData.totalDistance
		totalClubHours += JSONdata.totalData.totalClubHours
		totalClubPoints += JSONdata.totalData.totalClubPoints
		for (const team of JSONdata.weekly_summary[0].updates) {
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
			totalDistance: roundNumbers(totalClubDistance),
			totalHours: roundNumbers(totalClubHours),
			totalPoints: roundNumbers(totalClubPoints),
		},
		summary: weekly_summary,
	}
}

const hei = summarizeData().then((res) => {
	console.log(res)
})
console.log(hei)
