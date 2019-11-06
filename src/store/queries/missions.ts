import { gql } from 'apollo-boost';

export const ALL_SEARCH = gql`
  query AllSearch {
    missions(limit: 10) {
      id
      name
      description
      twitter
      website
    }
  }
`;
