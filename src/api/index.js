import axios from 'axios'

axios.defaults.baseURL = 'http://192.168.199.126:8080'
axios.defaults.timeout = 5000

var time = new Date().getTime()
var getData = {
  getFilms () {
    return axios.get('/data/all-rcmd-films.json?t=' + time)
  },
  getSeries () {
    return axios.get('/data/all-rcmd-series.json?t=' + time)
  }
}

export default getData
