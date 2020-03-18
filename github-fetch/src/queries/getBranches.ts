import { gql } from 'apollo-boost';

export default gql`
  query Branches($owner: String!, $repository: String!, $after: String!) {
    repository(owner: $owner, name: $repository) {
      refs (first: 100, refPrefix: "refs/heads/", after: $after) {
        nodes {
          name,
          target {
            ... on Commit {
              author {
                avatarUrl
                date
                email
                name
              }
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;
