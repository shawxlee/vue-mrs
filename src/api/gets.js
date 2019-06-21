import axios from 'axios'

var baseUrl = 'http://192.168.199.126:8080',
time = new Date().getTime();

const allData = {
	getFilms() {
		return axios.get(baseUrl + '/all-films.json?t=' + time, {timeout: 5000});
	},
	getSeries() {
		return axios.get(baseUrl + '/all-series.json?t=' + time, {timeout: 5000});
	}
}

export default allData