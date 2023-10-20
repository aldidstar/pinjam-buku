import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { Register } from '../actions/register'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

export default function RegisterPage() {
  const initiaUserState = {
    name: '',
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
    dispatch(Register(user.name, user.email, user.password))
  }

  return (
    <header className="text-center foto-style">
      <form onSubmit={handleSubmit} className="form-signin">
        <h1 className="h3 mb-3 font-weight-normal">Register Form</h1>
        <label htmlFor="inputEmail" className="sr-only">
          Full Name
        </label>
        <input
          type="text"
          id="inputName"
          name="name"
          className="form-control"
          placeholder="Name"
          required
          autoFocus=""
          onChange={handleChange}
        />
        <label htmlFor="inputEmail" className="sr-only">
          Email address
        </label>
        <input
          type="email"
          id="inputEmail"
          name="email"
          className="form-control"
          placeholder="Email address"
          required
          autoFocus=""
          onChange={handleChange}
        />
        <label htmlFor="inputPassword" className="sr-only">
          Password
        </label>
        <input
          type="password"
          id="inputPassword"
          name="password"
          className="form-control"
          placeholder="Password"
          required
          onChange={handleChange}
        />
        <div className="checkbox mb-3"></div>
        <Link className="btn btn-lg btn-warning btn-block" to="/">
          {' '}
          Cancel{' '}
        </Link>
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Register
        </button>
      </form>
    </header>
  )
}
