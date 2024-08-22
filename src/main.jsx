import React from 'react'
import ReactDOM from 'react-dom/client'
// custom css
import './index.css'
// bootstrap css
import "/node_modules/bootstrap/dist/js/bootstrap.bundle.js";
// toastify css
import '/node_modules/react-toastify/dist/ReactToastify.css';
// swiper css
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
// app
import App from './App.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
