import env from "react-dotenv";

const apiKey = process.env.REACT_APP_APIKEY;
const url = process.env.REACT_APP_URL;

export const searchMovie = (query) => {
  return fetch(
  url +
  apiKey +
  query
  );
};