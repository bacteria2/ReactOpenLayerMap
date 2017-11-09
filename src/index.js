import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './assets/iconfont/iconfont.css';
import Map from './components/Map'
import registerServiceWorker from './registerServiceWorker';
import Config from './config'

ReactDOM.render(<Map mapConfig={Config.mapType}/>, document.getElementById('root'));
//registerServiceWorker();
