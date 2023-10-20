import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/fontawesome/css/all.min.css'
import './assets/styles/style.css'

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import rootReducer from './reducers'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import jwt_decode from 'jwt-decode'
import RegisterPage from './pages/RegisterPage'

import LoginPage from './pages/Login'
import ListBuku from './pages/listBuku'

import Admin from './pages/Admin'

const store = createStore(rootReducer, applyMiddleware(thunk))

// ... (imports)

function App() {
  const token = localStorage.getItem('token')

  const checkRole = (role, allowedRoles) => {
    return allowedRoles.includes(role)
  }

  const PrivateRoute = ({ component: Component, allowedRoles, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        token && checkRole(jwt_decode(token).role, allowedRoles) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  )

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
            <Route
              exact
              path="/"
              render={() =>
                token ? (
                  checkRole(jwt_decode(token).role, ['admin']) ? (
                    <Redirect to="/dashboard" />
                  ) : (
                    <Redirect to="/list" />
                  )
                ) : (
                  <LoginPage />
                )
              }
            />
            <Route path="/register" render={() => <RegisterPage />} />
            <Route path="/login" render={() => <LoginPage />} />
            <PrivateRoute
              path="/list"
              component={ListBuku}
              allowedRoles={['user']}
            />
            <PrivateRoute
              path="/dashboard"
              component={Admin}
              allowedRoles={['admin']}
            />
            <Redirect to="/" />
          </Switch>
        </div>
      </Router>
    </Provider>
  )
}

export default App
