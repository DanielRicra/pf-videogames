import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'

import App from './App.jsx'
import store from './redux/store'
import './index.css'

const root = document.getElementById('root')

const domain = import.meta.env.VITE_AUTH0_DOMAIN
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID

const authorizationParams = {
  redirect_uri: window.location.origin
}

createRoot(root).render(
  <React.StrictMode>
    <Auth0Provider domain={domain} clientId={clientId} authorizationParams={authorizationParams}>
      <Provider store={store}>
        <BrowserRouter >
          <App />
        </BrowserRouter>
      </Provider>
    </Auth0Provider>
  </React.StrictMode>
)
