import React from 'react'
import ReactDOM from 'react-dom'
import App from './App';
import './index.css'
import { store, persistor } from './Components/Redux/Store/store'
import { Provider } from 'react-redux'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { PersistGate } from 'redux-persist/integration/react'

const options = {
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: '30px',
    transition: transitions.SCALE
}

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <AlertProvider template={AlertTemplate} {...options}>
                <App />
            </AlertProvider>
        </PersistGate>
    </Provider>
    , document.getElementById("root"));