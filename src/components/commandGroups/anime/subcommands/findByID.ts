import { GraphQLClient } from "graphql-request";
import findByIDQuery from "../graphql/findByIdGraphql";

const processDate = (date: { year: number; month: number; day: number }) =>
  `${date.day}/${date.month}/${date.year}`;

const findByID = async (id: number,idType:"id"|"idMal") => {
  const client = new GraphQLClient("https://graphql.anilist.co");
  const variables = { id };
  const anime = (await client.request(findByIDQuery("id"), variables)).Media;
  return `Title: ${anime.title.userPreferred}
ID: ${anime.id}
MAL ID: ${anime.idMal}
Type: ${anime.type}
Format: ${anime.format}
Status: ${anime.status}

Description: ${anime.description.replace(/<[^>]*>?/gm, '')}

Start date: ${processDate(anime.startDate)}
End date: ${processDate(anime.endDate)}

Season: ${anime.season}
Season Year: ${anime.seasonYear}
Season Number: ${anime.seasonInt}
Episodes: ${anime.episodes}
Duration: ${anime.duration}
${anime.chapters?`Chapters: ${anime.chapters}`:""}
${anime.volumes?`Volumes: ${anime.volumes}`:""}
Source: ${anime.source}

${anime.hashtag ? `Hashtag: ${anime.hashtag}` : ""}
${anime.trailer ? `Trailer: ${anime.trailer.site}` : ""}

${/*Updated at: ${new Date(anime.updatedAt)}*/""}
Genres: ${anime.genres.join("  ")}
Average Score: ${anime.averageScore}
Mean Score: ${anime.meanScore}

Tags: ${anime.tags.map((tag: { name: string }) => tag.name).join("  ")}

Site URL: ${anime.siteUrl}
`;
};

export default findByID;
