import axios from "axios";

async function modifyCollection(collectionId, items, name) {
  try {
    return await axios
      .patch(
        `${process.env.REACT_APP_API_URL}/collections/id/${collectionId}`,
        { items, name }
      )
      .then(({ data }) =>
        console.log("this is the response from modify Collection ", data)
      )
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
      .post(`${process.env.REACT_APP_API_URL}/collections`, {
        owner,
        items,
        name
      })
      .then(({ data }) => console.log("this is the response data ", data))
      .catch(error => {
        console.log(error);
      });
  } catch (error) {
    console.log("Error in createCollectionWithItems: ", error);
  }
}

async function deleteCollection(collectionId) {
  try {
    return await axios
    .delete(`${process.env.REACT_APP_API_URL}/id/${collectionId}`)
    .then(({ data }) =>
        console.log("this is the response from delete Collection ", data)
      )
      .catch(error => {
        console.log(error);
      });
  } catch (error) {
    console.log("Error in deleteCollection: ", error);
  }
  
}

export { modifyCollection, createCollectionWithItems, deleteCollection};
