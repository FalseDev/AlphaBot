interface searchedAnime {
  id: number;
  idMal: number;
  title: {
    userPreferred: string;
  };
  type: string;
  status: string;
  season: string;
  seasonYear: number;
  seasonInt: number;
  episodes: number;
}

export default searchedAnime;
