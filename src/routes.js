import React from 'react';
import { Route, Router, IndexRoute } from 'react-router';

import Application from './components/application';

const Routes = (
  <Router>
    <Route path="/" >
      <IndexRoute component={ Application } />
      <Route path="helloworld" component={ Application } />
    </Route>
  </Router>
)

export default Routes;