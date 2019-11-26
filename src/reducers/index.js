import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import authReducer from './authReducer'
import hostReducer from './hostReducer'

export default combineReducers({
	auth: authReducer,
	hosts: hostReducer,
	form: formReducer
})
