import axios, { AxiosResponse } from 'axios'

export const getInfoFromApi = async <ResponseType extends Record<string, any>>(
	URL: string,
): Promise<AxiosResponse<ResponseType>> => axios.get<ResponseType>(URL)
