import { FETCH_HOSTS } from '../actions/types'

export default (state = [], action) => {
	switch (action.type) {
		case FETCH_HOSTS:
			let hosts = [...state, ...action.payload]

			let hostIds = []

			for (let host of hosts) {
				hostIds.push(host._id)
			}

			let uniqueHostIds = [...new Set(hostIds)]

			let uniqueHosts = []
			for (let id of uniqueHostIds) {
				for (let host of hosts) {
					if (id === host._id) {
						uniqueHosts.push(host)
						break
					}
				}
			}

			return uniqueHosts

		default:
			return state
	}
}
