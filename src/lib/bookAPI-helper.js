import axios from "axios";

function fullSearch(query, filter, limit) {
  if (!filter) filter=""
  let maxResults = (limit || limit < 40) ? limit : 10;
  if (query.length > 2) {
    return axios
      .get(`${process.env.REACT_APP_GOOGLE_API_BASEURL}?q=${filter}${query}&key=${process.env.REACT_APP_GOOGLE_API_KEY}&maxResults=${maxResults}`)
      .then(response => response.data.items)
      .catch(error => {
        console.log(error);
      });
  } else return [];
}

async function getBook(id) {
  try {
     return await axios
    .get(`${process.env.REACT_APP_GOOGLE_API_BASEURL}/${id}?&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
    .then(response => response.data)
    .catch(error => {
      console.log(error);
    });
  } catch (error) {
    console.log(error);
  }
}

export {fullSearch, getBook};
