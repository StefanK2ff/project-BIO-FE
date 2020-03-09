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

export { modifyCollection, createCollectionWithItems };
