import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { Login } from '../actions/login'

export default function LoginPage() {
  const initiaUserState = {
    email: '',
    password: ''
  }

  const dispatch = useDispatch()

  const [user, setUser] = useState(initiaUserState)

  const handleChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name
    setUser({ ...user, [name]: value })
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(user.email, user.password, 'kkkk')
    dispatch(Login(user.email, user.password))
  }

  return (
    <header className="text-center foto-style">
      <form onSubmit={handleSubmit} className="form-signin">
        <h1 className="h3 mb-3  font-weight-normal">Please sign in</h1>
        <label htmlFor="inputEmail" className="sr-only">
          Email address
        </label>
        <input
          type="email"
          id="inputEmail"
          className="form-control"
          placeholder="Email address"
          name="email"
          onChange={handleChange}
          required=""
          autoFocus=""
        />
        <label htmlFor="inputPassword" className="sr-only">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          onChange={handleChange}
          required=""
        />
        <div className="checkbox mb-3"></div>
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Sign in
        </button>

        <Link className="btn btn-lg btn-success btn-block" to="/register">
          {' '}
          Register{' '}
        </Link>
      </form>
    </header>
  )
}
