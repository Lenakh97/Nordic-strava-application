import axios from 'axios'

export const fetchFiles = async (URL: string): Promise<any> => {
	const result = await axios.get(URL, {
		headers: {
			Authorization: `token ${process.env.GITHUB_TOKEN}`,
		},
	})
	return result.data
}
