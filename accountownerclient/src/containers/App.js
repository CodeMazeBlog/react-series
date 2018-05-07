import React, { Component } from 'react';
import './App.css';
import Layout from '../components/Layout/Layout';
import Home from '../components/Home/Home';

class App extends Component {
  render() {
    return (
      <Layout>
        <Home />
      </Layout>
    );
  }
}

export default App;
