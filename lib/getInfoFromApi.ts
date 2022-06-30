import axios, { AxiosResponse } from 'axios'

export const getInfoFromApi = async <ResponseType extends Record<string, any>>(
	URL: string,
): Promise<AxiosResponse<ResponseType>> => {
	const response = await axios.get<ResponseType>(
		URL /*, {
		headers: {
			//Authorization: `token ${process.env.GITHUB_TOKEN}`,
			Authorization: 'Bearer a04fa448f25f7b4b1073511b36f545a13ecc52f6'
		},
	}*/,
	)
	return response
}
