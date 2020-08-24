import { gql } from "graphql-request";

const searchQuery = gql`
  query($search: String, $page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(search: $search) {
        id
        idMal
        title {
          english
          userPreferred
        }
        status
      }
    }
  }
`;

export default searchQuery;
