import React, { Component } from "react";
import BookCard from "./BookCard";
import { withAuth } from "./../lib/Auth";

import CollectionCloud from "./CollectionCloud";

class BookLibraryListing extends Component {
  
  render() {
    return (
      <div>
        {this.props.loadedBooks.map(book => {
          return (
            <div>
              <BookCard book={book} />
              <CollectionCloud bookId={book.id} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default withAuth(BookLibraryListing);


