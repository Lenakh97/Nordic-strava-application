import axios from 'axios'
import { Summary } from './summarizeStravaData'

export const fetchData = async (): Promise<Summary> => {
	const result = await axios.get<Summary>(
		`https://lenakh97.github.io/Nordic-strava-application/JSONObject.json?${Date.now()}`,
	)

	return result.data
}
