export const getWeek = (
	startTimeStamp: number,
	fetchingTimestamp: number,
): number => {
	let weekNumber = 1
	if (
		fetchingTimestamp > startTimeStamp + 604800 &&
		fetchingTimestamp < startTimeStamp + 1209600
	) {
		weekNumber = 2
	} else if (
		fetchingTimestamp > startTimeStamp + 1209600 &&
		fetchingTimestamp < startTimeStamp + 1814400
	) {
		weekNumber = 3
	} else if (
		fetchingTimestamp > startTimeStamp + 1814400 &&
		fetchingTimestamp < startTimeStamp + 2419200
	) {
		weekNumber = 4
	} else if (
		fetchingTimestamp > startTimeStamp + 2419200 &&
		fetchingTimestamp < startTimeStamp + 3024000
	) {
		weekNumber = 5
	}
	return weekNumber
}
