import * as path from 'path'
import { readFileFromFolder } from './readFileFromFolder'

const folderPath = path.join(process.cwd(), 'test-data', 'summarizeStravaData')
const files = 'clubinfo.838200.json'
describe('readFileFromFolder()', () => {
	it('Should read file from folder', async () => {
		expect(await readFileFromFolder({ folderPath, files })).toMatchObject({
			id: 838200,
			resource_state: 3,
			name: 'Nordic Semiconductor - Oslo Office',
			profile_medium:
				'https://dgalywyr863hv.cloudfront.net/pictures/clubs/838200/18595061/1/medium.jpg',
			profile:
				'https://dgalywyr863hv.cloudfront.net/pictures/clubs/838200/18595061/1/large.jpg',
			cover_photo:
				'https://dgalywyr863hv.cloudfront.net/pictures/clubs/838200/18607782/3/large.jpg',
			cover_photo_small:
				'https://dgalywyr863hv.cloudfront.net/pictures/clubs/838200/18607782/3/small.jpg',
			activity_types: [],
			activity_types_icon: 'sports_multi_normal',
			dimensions: ['moving_time', 'num_activities', 'distance', 'elev_gain'],
			sport_type: 'other',
			city: 'Oslo',
			state: 'Oslo',
			country: 'Norway',
			private: true,
			member_count: 80,
			featured: false,
			verified: false,
			url: 'nordicsemi-oslo',
			membership: 'member',
			admin: false,
			owner: false,
			description:
				'For Your Info:\r\n\r\nThe Strava Leaderboard only shows the following three activities: Running/Cycling/Swimming (triathlon disciplines) that can’t be changed.  \r\n\r\nHowever, Andreas Bakke from NTNU (stats guy) is an admin in each Nordic Group, therefore can see all activities you post/share.  For extra peace of mind, it might be worth adding/following Andreas Bakke and set a reminder to unfollow when the challenge ends on 1st Nov 21.',
			club_type: 'company',
			following_count: 7,
		})
	})
})
