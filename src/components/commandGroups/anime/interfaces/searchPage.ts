import pageInfo from "./pageInfo";
import searchedAnime from "./searchedAnime";

interface searchPage {
  Page: {
    pageInfo: pageInfo;
    media: searchedAnime[];
  };
}

export default searchPage;
