import {
	CHECK_IN_VISITOR,
	CHECK_OUT_VISITOR,
	CHECK_IN_HOST,
	CHECK_OUT_HOST,
	FETCH_PENDING_VISITORS_LIST
} from '../actions/types'

const INITIAL_STATE = {
	isHost: null,
	name: null,
	email: null,
	phone: null,
	selectedHostId: null,
	checkInTime: null,
	checkOutTime: null,
	address: null,
	sessionId: null,
	pendingVisitorsList: null,
	flashMessage: ''
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CHECK_IN_VISITOR:
			let { name, email, phone, checkInTime, hostId, address, _id } = action.payload
			// console.log(checkInTime)
			return {
				...state,
				isHost: false,
				name,
				email,
				phone,
				checkInTime: new Date(checkInTime).toString(),
				selectedHostId: hostId,
				address,
				sessionId: _id
			}
		case CHECK_IN_HOST:
			return {
				...state,
				isHost: true,
				name: action.payload.name,
				email: action.payload.email,
				phone: action.payload.phone
			}

		case CHECK_OUT_VISITOR:
			return {
				...state,
				isHost: null,
				name: null,
				email: null,
				phone: null,
				selectedHostId: null,
				checkInTime: null,
				checkOutTime: null,
				address: null,
				sessionId: null,
				pendingVisitorsList: null,
				flashMessage: action.payload
			}

		case CHECK_OUT_HOST:
			return {
				...state,
				isHost: null,
				name: null,
				email: null,
				phone: null,
				selectedHostId: null,
				checkInTime: null,
				checkOutTime: null,
				address: null,
				sessionId: null,
				pendingVisitorsList: null,
				flashMessage: ''
			}

		case FETCH_PENDING_VISITORS_LIST:
			return { ...state, pendingVisitorsList: action.payload.pendingVisitors }
		default:
			return state
	}
}
