import gql from 'graphql-tag';

export const SKIPPED_AUTH = gql`
  query SkippedAuth {
    skippedAuth @client
  }
`;

export const SET_SKIPPED_AUTH = gql`
  mutation SetSkippedAuth($skipped: Boolean!) {
    setSkippedAuth(skipped: $skipped) @client
  }
`;
