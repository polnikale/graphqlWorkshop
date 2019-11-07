import gql from 'graphql-tag';

export const USERS_QUERY = gql`
  query Users {
    users {
      name
    }
  }
`;

export const ADD_USER_MUTATION = gql`
  mutation AddUser($name: String!) {
    insert_users(objects: [{name: $name}]) {
      returning {
        name
      }
    }
  }
`;
