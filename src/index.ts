import React from 'react';
import ReactDOM from 'react-dom';
import App from '@src/App';

// TODO inject global styles in html template
document.body.style.setProperty('font-family', 'system-ui');

ReactDOM.render(
  React.createElement(App),
  document.body.appendChild(
    document.createElement('div'),
  ),
);
