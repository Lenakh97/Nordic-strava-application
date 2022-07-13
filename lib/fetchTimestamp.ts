import axios from 'axios'
import { StravaObject } from '../getStravaData'

export const fetchTimeStamp = async (): Promise<number> => {
	const result = await axios.get<StravaObject>(
		`https://lenakh97.github.io/Nordic-strava-application/JSONObject.json?${Date.now()}`,
	)

	return result.data.timestamp
}
