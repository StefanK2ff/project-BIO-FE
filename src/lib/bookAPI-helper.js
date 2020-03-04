import axios from "axios";

const baseURL = "https://www.googleapis.com/books/v1/volumes";
const APIkey = "AIzaSyD_mH2FaBJych4OrXJ8OfsnQ1Uwh9z6kHs";

function fullSearch(query, filter, limit) {
    if (!filter) filter=""
  let maxResults = (limit || limit < 40) ? limit : 10;
  if (query.length > 2) {
    return axios
      .get(`${baseURL}?q=${filter}${query}&key=${APIkey}&maxResults=${maxResults}`)
      .then(response => response.data.items)
      .catch(error => {
        console.log(error);
      });
  } else return [];
}

export default fullSearch;
