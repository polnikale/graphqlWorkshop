# graphqlWorkshop
install dependencies: ```apollo-boost @apollo/react-hooks graphql```

url: ```https://api.spacex.land/graphql```<br />
install graphql-codegen: ```yarn add -D @graphql-codegen/cli```<br />
install libraries for graphql-codegen: ```yarn add -D @graphql-codegen/typescript @graphql-codegen/typescript-operations @graphql-codegen/typescript-react-apollo @graphql-codegen/typescript-resolvers```<br />
add a few more ```yarn add @apollo/react-components @apollo/react-hoc``` libraries for codegen<br />
add ```codegen.yml``` to the root with the following content:
```
overwrite: true
schema:
  - 'https://api.spacex.land/graphql/'
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
export const ALL_MISSION_SEARCH = gql`
  query AllMissionSearch {
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
export const VALUE_MISSION_SEARCH = gql`
  query ValueMissionSearch($name: String!) {
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
