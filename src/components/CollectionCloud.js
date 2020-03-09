import React from 'react'
import { withAuth } from '../lib/Auth'

/* NOTES 
    This modulre requires following Data
    - collections from the user (Props)
    - A Book ID
    - Needs nothing to store in a state (stateless)
    Functions
    1) removeFromCollection
    2) addToCollection
    3) addToNewColl
*/

function CollectionCloud() {
    return (
        <div>
            <div>
                {this.props.user.collections.map(collection => {
                  if (collection.items.includes(book.id)) {
                    return (
                      <li>
                        <button
                          onClick={this.removeFromCollection}
                          id={collection._id}
                          bookid={book.id}
                          name={collection.name}
                          variant="dark"
                        >
                          Remove from {collection.name}
                        </button>
                      </li>
                    );
                  } else {
                    return (
                      <li>
                        <button
                          onClick={this.addToCollection}
                          id={collection._id}
                          bookid={book.id}
                          name={collection.name}
                          variant="light"
                        >
                          Add to {collection.name}
                        </button>
                      </li>
                    );
                  }
                })}
                {/* <li>
                  Create new collection:
                  <form>
                    <input
                      type="text"
                      name="newCollection"
                    //   value={this.state.newCollection}
                      onChange={this.formHandleChange}
                    />
                    <button
                      type="submit"
                      bookid={this.state.book.id}
                    //   onClick={this.addToNewColl}
                    >
                      Create + add
                    </button>
                  </form>
                </li> */}
            </div>
        </div>
    )
}


export default withAuth(CollectionCloud)
