import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import Root from './src/Root';
import client from './src/store';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Root />
    </ApolloProvider>
  );
};

export default App;
