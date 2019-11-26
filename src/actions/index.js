import {
	CHECK_IN_VISITOR,
	CHECK_OUT_VISITOR,
	FETCH_HOSTS,
	CHECK_IN_HOST,
	CHECK_OUT_HOST,
	FETCH_PENDING_VISITORS_LIST
} from './types'

import entryMgmtApi from '../apis/entryMgmtApi'
import history from '../history'

export const checkInVisitor = formValues => {
	return async dispatch => {
		const response = await entryMgmtApi.post('/visitors', formValues)
		// console.log(response)
		dispatch({
			type: CHECK_IN_VISITOR,
			payload: { ...response.data._doc, hostId: response.data.hostId }
		})
		history.push('/dashboard')
	}
}

export const checkOutVisitor = reqBody => {
	return async dispatch => {
		const response = await entryMgmtApi.patch('/checkoutVisitor', reqBody)
		dispatch({
			type: CHECK_OUT_VISITOR,
			payload: response.data.toString()
		})
		history.push('/')
	}
}

export const fetchHosts = () => {
	return async dispatch => {
		const response = await entryMgmtApi.get('/hosts')
		dispatch({
			type: FETCH_HOSTS,
			payload: response.data
		})
	}
}

export const fetchPendingVisitorsList = hostId => {
	return async dispatch => {
		const response = await entryMgmtApi.get(`/host/${hostId}`)
		dispatch({
			type: FETCH_PENDING_VISITORS_LIST,
			payload: response.data
		})
	}
}

export const checkInHost = formValues => {
	return async dispatch => {
		const response = await entryMgmtApi.post('/hosts', formValues)
		dispatch({
			type: CHECK_IN_HOST,
			payload: response.data
		})
		history.push('/dashboard')
	}
}

export const checkOutHost = () => {
	history.push('/')
	return {
		type: CHECK_OUT_HOST
	}
}
