import React from 'react';
import { render } from 'react-dom';
import { Router, hashHistory } from 'react-router'

// styles
import Bootstrap from 'bootstrap/scss/bootstrap.scss';
import FA from 'font-awesome/css/font-awesome.css';
import FLAGS from 'famfamfam-flags/dist/sprite/famfamfam-flags.css';
import Style from './style/index.scss';

import routes from './routes/routes';

render((
  <Router history={hashHistory}>
    {
      routes()
    }
  </Router>
), document.getElementById('app'));
