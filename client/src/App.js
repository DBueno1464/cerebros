import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

import Navbar from './components/Navbar';

import LandingPage from './pages/LandingPage';
import SavedContent from './pages/SavedContent';
import SearchContent from './pages/SearchContent';


const httpLink = new createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Navbar />
          <div className="container">
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/search" component={SearchContent} />
            <Route exact path="/saved" component={SavedContent} />
            <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
          </Switch>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
