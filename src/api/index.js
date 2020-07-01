import store from '../redux/store'
import {
  receiveAccessTokens,
  logoutCurrentUser,
  loggingIn,
  setUserInfo,
} from '../redux/actions/session'

// TODO: Handle errors in this class, and return error messages

class Api {
  /* Mediates the interaction with the API through HTTP requests */
  constructor(baseUrl) {
    this.baseUrl = baseUrl
    this.baseHeaders = {
      'content-type': 'application/json',
    }
    this.authedHeaders = {
      ...this.baseHeaders,
    }
  }

  /**
   * Get's the full WebSocket URL from the API path
   * @param {string} path API path. (For http://localhost:8000/api/registry/plot, path='registry/plot')
   * @param {object=} query Optional. Query object to be included as a query string in the url.
   * @returns {string} url
   */
  url(path, query = {}) {
    const url = new URL(`${this.baseUrl}${path}`)
    Object.entries(query).forEach(([k, v]) => url.searchParams.append(k, v))
    return url
  }

  /**
   * Execute a get request
   * @param {string} path API path.
   * @param {Object.<string>} headers Object containing extra headers
   * @param {Object} query Object containing query parameters
   */
  async get(path, headers, query) {
    return fetch(this.url(path, query), {
      method: 'GET',
      headers: { ...this.authedHeaders, ...headers }, // TODO: Add auth header
    }).then((resp) => resp.json())
  }

  /**
   * Execute a get request
   * @param {string} path API path. Must end with '/' (E.g.: 'registry/plot/')
   * @param {Object} body Request body
   * @param {Object.<string>} headers Object containing extra headers
   * @param {Object} query Object containing query parameters
   */
  async post(path, body, headers, query) {
    return fetch(this.url(path, query), {
      method: 'POST',
      headers: { ...this.authedHeaders, ...headers }, // TODO: Add auth header
      body: JSON.stringify(body),
    }).then((resp) => resp.json())
  }

  /**
   * Method for registering a new user
   * @param {{username: string, email: string, password: string, password2: string}} body Object containing the registration parameters
   */
  async register(body) {
    const response = await fetch(this.url('auth/register/'), {
      method: 'POST',
      headers: this.baseHeaders,
      body: JSON.stringify(body),
    }).then((resp) => resp.json())

    if (!response || !response.access || !response.refresh) {
      return { errors: response }
    }

    return this.logIn({ username: body.username, password: body.password })
  }

  /**
   * Method for loggingIn a new user
   * @param {{username, password}} body Object containing username and password
   * @returns {{access: string, refresh: string, username: string, email: string}}
   */
  async logIn(body) {
    const response = await fetch(this.url('auth/log_in/'), {
      method: 'POST',
      headers: this.baseHeaders,
      body: JSON.stringify(body),
    }).then((resp) => resp.json())

    if (!response || !response.access || !response.refresh) {
      throw new Error('API error')
    }

    store.dispatch(receiveAccessTokens(response))
    store.dispatch(setUserInfo(response))
    return response
  }

  /**
   * Method for obtaining a new refresh and access token
   * @param {string} refresh Refresh token
   */
  async refresh(refresh) {
    if (!refresh && (!store.session || !store.session.refresh)) {
      throw new Error('No refresh token stored')
    }

    store.dispatch(loggingIn(true))

    const response = await fetch(this.url('auth/refresh/'), {
      method: 'POST',
      headers: this.baseHeaders,
      body: JSON.stringify({ refresh: refresh || store.session.refresh }),
    })
      .then((resp) => resp.json())
      .finally((resp) => {
        store.dispatch(loggingIn(false))
        return resp
      })

    if (!response || !response.access) {
      store.dispatch(logoutCurrentUser())
      throw new Error('API error')
    }

    store.dispatch(receiveAccessTokens({ refresh, access: response.access }))
    return response
  }

  /**
   * Logs out the current user.
   */
  async logOut() {
    return store.dispatch(logoutCurrentUser())
  }
}

// TODO: Get url from env
export default new Api('http://localhost:8000/api/')
