import React from 'react'
import {render} from 'react-dom'

import App from "./App";
import store from './app/store'
import { Provider } from 'react-redux'
import {fetchWeathers} from "./features/weathers/weathersSlice";

const rootElement = document.getElementById("root");

// store.dispatch(fetchWeathers())

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    rootElement
)
