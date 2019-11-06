import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://www.graphqlhub.com/graphql',
});

export default client;
