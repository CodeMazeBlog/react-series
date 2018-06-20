import React, { Component } from 'react';
import './App.css';
import Layout from '../components/Layout/Layout';
import Home from '../components/Home/Home';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NotFound from '../components/ErrorPages/NotFound/NotFound';
//import OwnerList from './Owner/OwnerList/OwnerList';
import asyncComponent from '../hoc/AsyncComponent/AsyncComponent';
import internalServer from '../components/ErrorPages/InternalServer/InternalServer';
import OwnerDetails from './Owner/OwnerDetails/OwnerDetails';
import CreateOwner from './Owner/CreateOwner/CreateOwner';

const AsyncOwnerList = asyncComponent(() => {
  return import('./Owner/OwnerList/OwnerList');
});

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/owner-list" component={AsyncOwnerList} />
            <Route path="/ownerDetails/:id" component={OwnerDetails} />
            <Route path="/createOwner" component={CreateOwner} />
            <Route path="/500" component={internalServer} />
            <Route pat="*" component={NotFound} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
