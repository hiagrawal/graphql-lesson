import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient, gql } from 'apollo-boost';

import { store, persistor } from './redux/store';

import './index.css';
import App from './App';
import {typeDefs, resolvers} from './graphql/resolvers';

const httpLink = createHttpLink({
  uri: 'https://crwn-clothing.com/'
});
//uri will be the graphql server link

const cache = new InMemoryCache();

//by adding typeDefs and resolvers in client, client has now access to the new mutations that we wrote
const client = new ApolloClient({
  link : httpLink,
  cache,
  typeDefs,
  resolvers
});

// client.query({
//   query: gql`
//   {
//     getCollectionsByTitle(title:"womens"){
//       id
//       title
//     }
//   }
//   `
// }).then(res => console.log(res));

//This is how we are creating and initiating a local state like we used to do in reducers
//And we are doing this in index.js because we want data when the applications loads
client.writeData({
  data: {
    cartHidden: true,
    cartItems: [],
    itemCount:0
  }
});

ReactDOM.render(
<ApolloProvider client={client}>
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>
</ApolloProvider>,
  document.getElementById('root')
);
