import axios, { AxiosResponse } from 'axios'

export const postInfoToApi = async <ResponseType extends Record<string, any>>(
	URL: string,
): Promise<AxiosResponse<ResponseType>> => {
	const response = await axios.post<ResponseType>(URL)
	return response
}
