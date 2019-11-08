import { InMemoryCache } from 'apollo-boost';
import { IResolvers, MissionResolvers, Resolvers } from '../../generated/graphql';

export const resolvers: IResolvers = {
  Mission: {
    isFavorite: (parent, _, cache, info) => {
      return parent.name ? parent.name.includes('Iridium') : false;
    },
  },
  Mutation: {
    setSkippedAuth: (
      parent,
      {skipped},
      {cache}: {cache: InMemoryCache},
      info,
    ) => {
      cache.writeData({
        data: {
          skippedAuth: skipped,
        },
      });

      return skipped;
    },
  },
};
