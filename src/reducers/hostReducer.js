import { FETCH_HOSTS } from '../actions/types'

export default (state = [], action) => {
	switch (action.type) {
		case FETCH_HOSTS:
			let newHosts = []
			for (let host of state) {
				for (let fetchedHost of action.payload) {
					if (host._id !== fetchedHost._id) {
						newHosts.push(fetchedHost)
					}
				}
			}
			return newHosts

		default:
			return state
	}
}
