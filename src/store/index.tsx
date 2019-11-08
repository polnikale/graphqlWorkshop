import ApolloClient from 'apollo-boost';
import { IResolvers } from '../generated/graphql';
import { resolvers } from './resolvers';

const client = new ApolloClient({
  uri: 'https://api.spacex.land/graphql',
  resolvers,
});

export default client;
