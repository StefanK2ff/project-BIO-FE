import React, { Component } from "react";
import BookCard from "./BookCard";
import { withAuth } from "./../lib/Auth";

import CollectionCloud from "./CollectionCloud";

class BookLibraryListing extends Component {
  state = {
    books: null,
    loading: true
  }
  
  componentDidMount() {
    this.setState({books: this.props.loadedbooks}, () => this.setState({loading: true}))
  }
  render() {
    return (
      <div>
        {this.props.loadedBooks.map(book => {
          console.log(this.props)
          return (
            <div key={book.id}>
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


