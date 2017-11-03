import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './assets/iconfont/iconfont.css';
import Map from './components/Map'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Map mapConfig="Tianditu"/>, document.getElementById('root'));
registerServiceWorker();
