import { SUCCESS_LOGIN } from '../constants'

import axios from 'axios'

const successLogin = () => ({
  type: SUCCESS_LOGIN
})

export const Login = (email, password) => {
  return (dispatch) => {
    return axios
      .post('http://localhost:3000/api/login', { email, password })
      .then(function (response) {
        localStorage.setItem('token', response.data.token)

        if (response.data.role === 'admin') {
          window.location = '/dashboard'
        } else {
          window.location = '/list'
        }

        dispatch(successLogin())
      })
      .catch(function (error) {
        alert('Email atau Password salah')
      })
  }
}
