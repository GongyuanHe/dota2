import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import dota2 from './Reducers.js';

let store = createStore(dota2);

ReactDOM.render(<Provider store={store}>
                    <App />
                </Provider>, document.getElementById('root'));
registerServiceWorker();
