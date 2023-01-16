import axios, { AxiosResponse } from 'axios'

export const postInfoToApi = async <ResponseType extends Record<string, any>>(
	URL: string,
): Promise<AxiosResponse<ResponseType>> => axios.post<ResponseType>(URL)
