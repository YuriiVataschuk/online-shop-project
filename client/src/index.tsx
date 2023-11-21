import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { HelmetProvider } from 'react-helmet-async'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <HelmetProvider>
      <HashRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </HashRouter>
    </HelmetProvider>
  </Provider>
)
reportWebVitals()