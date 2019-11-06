import { InMemoryCache } from 'apollo-boost';
import { MissionResolvers, Resolvers } from '../../generated/graphql';

export const resolvers = {
  Mission: {
    isFavorite: (parent, _, cache, info) => {
      return parent.name ? parent.name.includes('Iridium') : false;
    },
  },
} as Resolvers;
