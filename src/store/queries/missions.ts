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

export const VALUE_SEARCH = gql`
  query ValueSearch($name: String!) {
    missions(limit: 10, find: {name: $name}) {
      id
      name
      description
      twitter
      website
    }
  }
`;

export const SINGLE_MISSION = gql`
  query SingleMission($id: ID!) {
    mission(id: $id) {
      isFavorite @client
      name
      description
      id
      payloads {
        orbit
        manufacturer
        nationality
      }
    }
  }
`;
