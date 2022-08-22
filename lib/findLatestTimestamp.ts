import { fetchFiles } from './fetchFiles'
import { fetchTimeStamp } from './fetchTimestamp'

const getFilesUrl =
	'https://api.github.com/repos/lenakh97/Nordic-strava-application/git/trees/gh-pages?recursive=1'

export const findLatestTimestamp = async (): Promise<any> => {
	const responseFileFetching = await fetchFiles(getFilesUrl)
	const fileTreeLength = responseFileFetching.tree.length
	const lastFileName = responseFileFetching.tree[fileTreeLength - 1].path
	const timestampLastFetch = (await fetchTimeStamp(lastFileName)).timeStamp
	return timestampLastFetch
}
