import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import BookList from './BookList';
import './App.css';

const App = () =>
  <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact patch="/" component={BookList} />
      </Switch>
    </div>
  </BrowserRouter>;

export default App;
