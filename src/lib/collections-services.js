import axios from "axios";

const baseUrlBE = "http://localhost:5000";

function addBookToCollection(collectionId, items, name) {
    return axios
      .patch(`${baseUrlBE}/collections/id/${collectionId}`, {items, name})
      .then(response => {
          console.log(response)
        })
      .catch(error => {
        console.log(error);
      });
}

export default addBookToCollection;
