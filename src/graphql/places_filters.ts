import {gql} from "@apollo/client";

export const PLACES_FILTERS = gql`
  query nodesAll($search: String!, $filter: String, $filterValue: String, $pageSize: Int, $offset: String ) {
  pagedNodes(
    after: $offset
    first: $pageSize
    where: {
      tags: {
        any: true
      }
       and: [
        {
          tags: {
            some: {name: {eq: $filter}, value: {contains: $filterValue}}
          }
        }
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
        {
          tags: {
            some: { name: { eq: "name" }, value: { contains: $search } }
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
      location {
        coordinates
      }
       tags {
        name
        value
      }
    }
  }
}
`