# graphqlWorkshop
install dependencies: ```apollo-boost @apollo/react-hooks graphql```

## skip next steps any cry because the API I use for the workshop is very old and doesn't provide a schema :(
url: ```https://www.graphqlhub.com/graphql```
install graphql-codegen: ```yarn add -D @graphql-codegen/cli```
install libraries for graphql-codegen: ```yarn add -D @graphql-codegen/typescript @graphql-codegen/typescript-operations @graphql-codegen/typescript-react-apollo @graphql-codegen/typescript-resolvers```
add ```codegen.yml``` to the root with the following content:
```
overwrite: true
schema:
  - 'https://www.graphqlhub.com/graphql'
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

## that's when we're back
