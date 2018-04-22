import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import BookList from './BookList';
import BookSearch from './BookSearch';
import BookDetails from './BookDetails';
import './App.css';

const App = () =>
  <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path="/" component={BookList} />
        <Route path="/search" component={BookSearch} />
        <Route path="/books/:id" component={BookDetails} />
      </Switch>
    </div>
  </BrowserRouter>;

export default App;
