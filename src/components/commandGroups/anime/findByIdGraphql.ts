import { gql } from "graphql-request";

const findByIDQuery = gql`
  query($id: Int) {
    Media(id: $id) {
      id
      idMal
      title {
        userPreferred
      }
      type
      format
      status
      description
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      season
      seasonYear
      seasonInt
      episodes
      duration
      chapters
      volumes
      source
      hashtag
      trailer {
        site
      }
      updatedAt
      coverImage {
        extraLarge
      }
      genres
      averageScore
      meanScore
      favourites
      tags {
        name
      }
      siteUrl
    }
  }
`;

export default findByIDQuery;
