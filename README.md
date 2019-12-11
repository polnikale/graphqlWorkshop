# graphqlWorkshop
install dependencies: ```apollo-boost @apollo/react-hooks graphql```

url: ```https://api.spacex.land/graphql```<br />
```Setup```:
```
store/index.ts
import ApolloClient from 'apollo-boost';
import { resolvers } from './resolvers';

const client = new ApolloClient({
  uri: 'https://api.spacex.land/graphql',
  resolvers,
});

export default client;
```
```
App.tsx
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
```
install graphql-codegen: ```yarn add -D @graphql-codegen/cli```<br />
install libraries for graphql-codegen: ```yarn add -D @graphql-codegen/typescript @graphql-codegen/typescript-operations @graphql-codegen/typescript-react-apollo @graphql-codegen/typescript-resolvers```<br />
add a few more ```yarn add @apollo/react-components @apollo/react-hoc``` libraries for codegen<br />
add ```client-schema.graphql``` to the root with empty content<br/>
add ```codegen.yml``` to the root with the following content:
```
overwrite: true
schema:
  - 'https://api.spacex.land/graphql/'
  - './client-schema.graphql'
documents: 'src/store/queries/*.{tsx,ts}'
generates:
  src/generated/graphql.tsx:
    config:
      noNamespaces: true
      withHooks: true
    plugins:
      - 'typescript'
      - 'typescript-operations'
      - 'typescript-react-apollo'
      - 'typescript-resolvers'
```

Add ```    "codegen": "graphql-codegen --config codegen.yml"``` to scripts in ```package.json```<br />
```Magic```
<br/><br/><br/><br/><br/>
```Queries```<br/>
Fetch all missions:
```
export const ALL_MISSIONS_QUERY = gql`
  query AllMissions {
    missions(limit: 10) {
      id
      name
      description
      twitter
      website
    }
  }
`;
```
Fetch mission by value:
```
export const VALUE_MISSION_QUERY = gql`
  query ValueMission($name: String!) {
    missions(limit: 10, find: {name: $name}) {
      id
      name
      description
      twitter
      website
    }
  }
`;
```
<br /><br />
Fetch single mission:
```
export const SINGLE_MISSION_QUERY = gql`
  query SingleMission($id: ID!) {
    mission(id: $id) {
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
```
Fetch users:
```
export const USERS_QUERY = gql`
  query Users {
    users {
      name
    }
  }
`;
```
<br /><br /><br /><br />
```Mutations```:<br/>
Add user:
```
export const ADD_USER_MUTATION = gql`
  mutation AddUser($name: String!) {
    insert_users(objects: [{name: $name}]) {
      returning {
        name
      }
    }
  }
`;
```
Update data after successful update:
```
useAddUserMutation({
    update(cache, {data: newUsersData}) {
      const newUsers =
        (newUsersData &&
          newUsersData.insert_users &&
          newUsersData.insert_users.returning &&
          newUsersData.insert_users.returning) ||
        [];
      const oldUsersData = cache.readQuery<UsersQuery>({
        query: USERS_QUERY,
      });
      const oldUsers = (oldUsersData && oldUsersData.users) || [];
      cache.writeQuery({
        query: USERS_QUERY,
        data: {users: [...oldUsers, ...newUsers]},
      });
    },
  });
```
<br /><br /><br /><br /><br /><br />
```Local state:```
Add client value to SingleMission:
```
      isFavorite @client
```
Update schema: (in ```/client-schema.graphql```):
```
extend type Mission {
  isFavorite: Boolean
}
```
Add resolver: (```store/resolvers/index.ts```):
```
export const resolvers: IResolvers = {
  Mission: {
    isFavorite: (parent, _, cache, info) => {
      return parent.name ? parent.name.includes('Iridium') : false;
    },
  }
};

```
