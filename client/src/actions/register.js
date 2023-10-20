import { SUCCESS_REGISTER } from '../constants'

import axios from 'axios'

const successRegister = () => ({
  type: SUCCESS_REGISTER
})

export const Register = (name, email, password) => {
  return (dispatch) => {
    return axios
      .post('http://localhost:3000/api/register', { name, email, password })
      .then(function (response) {
        console.log(response)
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('name', response.data.data.name)
        window.location = '/list'

        dispatch(successRegister())
      })
      .catch(function (error) {
        alert(error.response.data.message)
      })
  }
}
