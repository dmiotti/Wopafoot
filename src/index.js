import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Import default css
import 'spectre.css/dist/spectre.min.css';
import 'spectre.css/dist/spectre-icons.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
