import { FETCH_HOSTS } from '../actions/types'

export default (state = [], action) => {
	switch (action.type) {
		case FETCH_HOSTS:
			return [...state, ...action.payload]
		default:
			return state
	}
}
