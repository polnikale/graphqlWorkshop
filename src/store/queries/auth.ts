import { gql } from 'apollo-boost';

export const ALL_TWEETS = gql`
  query search {
    twitter {
      search(q: "JavaScript", count: 5, result_type: popular) {
        id
        text
        user {
          name
        }
        retweet_count
      }
    }
  }
`;
export const SEARCH_TWEETS = gql`
  query search($search: String!) {
    twitter {
      search(q: $search, count: 5, result_type: popular) {
        id
        text
        user {
          name
        }
        retweet_count
      }
    }
  }
`;
