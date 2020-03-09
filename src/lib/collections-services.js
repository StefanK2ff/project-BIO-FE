import axios from "axios";

const baseUrlBE = "http://localhost:5000";

async function modifyCollection(collectionId, items, name) {
  try {
    return await axios
      .patch(`${baseUrlBE}/collections/id/${collectionId}`, { items, name })
      .then(({ data }) => console.log("this is the response data ", data))
      .catch(error => {
        console.log(error);
      });
  } catch (error) {
    console.log("Error in modifyCollection: ", error);
  }
}

async function createCollectionWithItems(owner, items, name) {
  try {
    return await axios
      .post(`${baseUrlBE}/collections`, { owner, items, name })
      .then(({ data }) => console.log("this is the response data ", data))
      .catch(error => {
        console.log(error);
      });
  } catch (error) {
    console.log("Error in createCollectionWithItems: ", error);
  }
}

export { modifyCollection, createCollectionWithItems };
