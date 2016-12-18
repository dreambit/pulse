import React from 'react';
import { render } from 'react-dom';
import { Router, hashHistory } from 'react-router'
import Bootstrap from 'bootstrap/scss/bootstrap.scss';

import routes from './routes/routes';

render((
  <Router history={hashHistory}>
    {
      routes()
    }
  </Router>
), document.getElementById('app'));
