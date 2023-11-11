import {gql} from "@apollo/client";

export const PLACES = gql`
  query nodesAll($search: String!, $pageSize: Int, $offset: String ) {
  pagedNodes(
    after: $offset
    first: $pageSize
    where: {
      tags: {
        any: true
      }
       or: [
        {
          tags: {
            some: { name: { eq: "name" }, value: { contains: $search } }
          }
        }
         {
          tags: {
            some: { name: { eq: "name:uk" }, value: { contains: $search } }
          }
        }
        {
          tags: {
            some: { name: { eq: "name:en" }, value: { contains: $search } }
          }
        }
      ]
    }
  ) {
    pageInfo {
      hasNextPage
      endCursor
      hasPreviousPage
      startCursor
    }
    totalCount
    nodes {
      id
       tags {
        name
        value
      }
    }
  }
}
`;