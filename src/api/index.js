import axios from 'axios'

var baseURL = 'http://192.168.199.126:8080',
time = new Date().getTime(),
getData = {
	getFilms() {
		return axios.get(baseURL + '/data/all-rcmd-films.json?t=' + time, {timeout: 5000})
	},
	getSeries() {
		return axios.get(baseURL + '/data/all-rcmd-series.json?t=' + time, {timeout: 5000})
	}
}

export default getData