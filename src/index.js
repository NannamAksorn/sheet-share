import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/antd/dist/antd.css'

import { createStore, applyMiddleware } from 'redux'
import myApp from './reducers'
import { Provider } from 'react-redux'
import reduxThunk from 'redux-thunk';

// import create from 'antd/lib/icon/IconFont';

const middleware = applyMiddleware(reduxThunk);
const store = createStore(myApp, middleware);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
