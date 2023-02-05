import React from 'react'
import ReactDOM from 'react-dom'
import "./styles.css"
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import {AuthProvider} from "./contexts/AuthContext";

ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>,
document.getElementById('root')
)
