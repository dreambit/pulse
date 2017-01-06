import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './../containers/app';
import OnlineUsersView from './../views/OnlineUsersView';

const routes = () => {
  return (
    <Route path="/" component={App}>
        <IndexRoute component={OnlineUsersView}/>
    </Route>
  );
}

export default routes;
