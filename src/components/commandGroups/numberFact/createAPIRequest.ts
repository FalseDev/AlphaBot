import axios from "axios";
const createAPIRequest = async (endpoint: string) => {
  return await axios({
    method: "GET",
    url: `https://numbersapi.p.rapidapi.com/${endpoint}`,
    headers: {
      "content-type": "application/octet-stream",
      "x-rapidapi-host": "numbersapi.p.rapidapi.com",
      "x-rapidapi-key": process.env.RAPID_API_KEY,
      useQueryString: true,
    },
    params: {
      fragment: "true",
      json: "true",
    },
  });
};

export default createAPIRequest