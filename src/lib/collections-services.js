import axios from "axios";

const baseUrlBE = "https://localhost:5000";

function addBookToCollection(owner, items, name) {
    return axios
      .post(`${baseUrlBE}/collections`, {owner, items, name})
      .then(response => console.log(response))
      .catch(error => {
        console.log(error);
      });
}

export default addBookToCollection;
