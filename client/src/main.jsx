import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'

import App from './App.jsx'
import store from './redux/store'
import './index.css'

const root = document.getElementById('root')

createRoot(root).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter >
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
