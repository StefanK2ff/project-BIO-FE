import axios from "axios";

const baseUrlBE = "http://localhost:5000";

async function addBookToCollection(collectionId, items, name) {
  console.log("given items ", items);
  try {
    return await axios
      .patch(`${baseUrlBE}/collections/id/${collectionId}`, { items, name })
      .then(({ data }) => console.log("this is the response data ", data))
      .catch(error => {
        console.log(error);
      });
  } catch (error) {
    console.log("Error in addBookToCollection: ", error);
  }
}

export default addBookToCollection;
