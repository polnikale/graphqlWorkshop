# graphqlWorkshop
install dependencies: ```apollo-boost @apollo/react-hooks graphql```

url: ```https://api.spacex.land/graphql```
install graphql-codegen: ```yarn add -D @graphql-codegen/cli```
install libraries for graphql-codegen: ```yarn add -D @graphql-codegen/typescript @graphql-codegen/typescript-operations @graphql-codegen/typescript-react-apollo @graphql-codegen/typescript-resolvers```
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

Add ```    "codegen": "graphql-codegen --config codegen.yml"``` to scripts in ```package.json```
