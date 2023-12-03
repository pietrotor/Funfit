module.exports = {
  overwrite: true,
  schema: 'http://localhost:4000/graphql-api',
  documents: './*/!(.d).{ts,tsx}',
  generates: {
    './graphql/graphql-types.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo'
      ],
      config: {
        namingConvention: {
          enumValues: 'keep'
        }
      }
    }
  }
}
