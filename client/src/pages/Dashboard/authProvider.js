const authProvider = {
  login: ({ username, password }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === 'admin' && password === 'admin') {
          resolve('fake-jwt-token')
        } else {
          reject('Invalid username or password')
        }
      }, 100)
    })
      .then((auth) => {
        localStorage.setItem('auth', JSON.stringify(auth))
      })
      .catch(() => {
        throw new Error('Network error')
      })
  },
  checkAuth: () =>
    localStorage.getItem('auth')
      ? new Promise((resolve) => resolve(JSON.parse(localStorage.getItem('auth'))))
      : new Promise((resolve, reject) => reject()),
  getPermissions: () => {
    // Required for the authentication to work
    return new Promise((resolve) => resolve())
  },
  logout: () => {
    localStorage.removeItem('auth')
    return new Promise((resolve) => resolve())
  },
}

export default authProvider
