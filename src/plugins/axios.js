import axios from 'axios'

export default ({ Vue }) => {
  Vue.prototype.$axios = axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
  })
}
