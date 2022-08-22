import axios from 'axios'

export const fetchTimeStamp = async (path: string): Promise<any> => {
	const result = await axios.get<any>(
		`https://lenakh97.github.io/Nordic-strava-application/${path}`,
	)

	return result.data
}
