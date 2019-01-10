import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { hot, setConfig } from 'react-hot-loader';
import Home from './home/HomeView';
import NotFound from './not_found/NotFoundView';

setConfig({ logLevel: 'debug' });

const App = () => (
  <BrowserRouter>
    <div>
        <Switch>
            <Route path="/" component={Home} exact />
            <Route component={NotFound}/>
        </Switch>
    </div>
  </BrowserRouter>
);

export default hot(module)(App)