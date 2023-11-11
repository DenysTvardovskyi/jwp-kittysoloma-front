import {gql} from "@apollo/client";

export const NODE_BY_ID = gql`
  query nodeById($id: Long!) {
    nodeById(id: $id) {
      id
      airQualityCategory
      location {
        coordinates
      }
      tags {
        id
        name
        value
      }
    }
  }
`;