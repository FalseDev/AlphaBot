import { GraphQLClient } from "graphql-request";
import searchQuery from "./searchGraphql";

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

  const data = await client.request(searchQuery, variables);

  // Add some info about the pagination and search
  let result = `Searched for: ${searchTerm}\nTotal results: ${data.Page.pageInfo.total}\nPage Number: ${data.Page.pageInfo.currentPage}\nResults on this page: ${data.Page.pageInfo.perPage}\n\n\n`;

  // Write all the search results to the message
  data.Page.media.forEach((res: any) => {
    result += `Title: ${
      res.title.english ? res.title.english : res.title.userPreferred
    }\nID: ${res.id}\nMAL ID: ${
      res.idMal ? res.idMal : "Not available"
    }\nStatus: ${res.status}\n\n`;
  });

  return result;
};

export default search;
