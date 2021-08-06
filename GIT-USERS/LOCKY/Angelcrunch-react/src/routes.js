import React from 'react';
import {Redirect, Route} from 'react-router';

import BaseDom from 'app/baseDom';
import projectDetails from 'app/project/detail';
import projectList from 'app/project/list';
import Login from 'app/login';

import '../static/css/wapsite/base-css.styl';

const routes = (
  <Route name='dombase' path='/' handler={BaseDom} >
    <Route name='projectDetails' path='/:id/details' handler={projectDetails} />
    <Route name='projectList' path='/items' handler={projectList} >
        <Route name='projectListVsNum' path='/items/:pageNum' handler={projectList} />
    </Route>
    <Route name='login' path='/login' handler={Login} />

    <Redirect to="projectList" />
  </Route>
);

export default routes;