import searchedAnime from "./searchedAnime";

interface date {
  year: number;
  month: number;
  day: number;
}

interface animeFullInfo extends searchedAnime {
  description: string;
  startDate: date;
  endDate: date;
}

export default animeFullInfo;
