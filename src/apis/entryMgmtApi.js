import axios from 'axios'

export default axios.create({
	baseURL: 'https://entrymgmt-api.herokuapp.com/'
	// baseURL: 'http://localhost:8080/'
})
