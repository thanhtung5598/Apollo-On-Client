import React from 'react';
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";

import ApoloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

// set up apollo Client
const client = new ApoloClient({
  uri:'http://localhost:4000/graphql'
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
