import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import store from './library/store.ts'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:4000'
axios.defaults.withCredentials = true

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
)
