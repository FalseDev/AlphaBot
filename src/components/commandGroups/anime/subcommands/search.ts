import { GraphQLClient } from "graphql-request";
import searchQuery from "../graphql/searchGraphql";
import searchPage from "../interfaces/searchPage";

const search = async ({
  searchTerm,
  perPage,
  page,
}: {
  searchTerm: string;
  perPage?: number;
  page?: number;
}) => {
  const variables = { search: searchTerm, perPage, page };
  const client = new GraphQLClient("https://graphql.anilist.co");

  const data = <searchPage>await client.request(searchQuery, variables);

  // Add some info about the pagination and search
  let result = `Searched for: ${searchTerm}\nTotal results: ${data.Page.pageInfo.total}\nPage Number: ${data.Page.pageInfo.currentPage}\nResults on this page: ${data.Page.pageInfo.perPage}\n\n\n`;

  // Write all the search results to the message
  data.Page.media.forEach((res) => {
    result +=
`Title: ${res.title.userPreferred}
ID: ${res.id} MAL ID: ${res.idMal ? res.idMal : "Not available"}
Status: ${res.status}
S:${res.season?res.seasonInt:"NA"}  S-Year:${res.seasonYear?res.seasonYear:"NA"} S-No.:${res.seasonInt?res.seasonInt:"NA"} Ep:${res.episodes?res.episodes:"NA"}\n\n`;
});

  return result;
};

export default search;
