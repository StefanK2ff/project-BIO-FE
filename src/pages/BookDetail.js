import React, { Component } from "react";
import { withAuth } from "./../lib/Auth";
import { getBook } from "./../lib/bookAPI-helper";
import {createCollectionWithItems, addBookToCollection} from "./../lib/collections-services";
import CollectionCloud from "../components/CollectionCloud";

class BookDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: {},
      loading: true,
    };
  }

  componentDidMount() {
    this.props.refresh(this.props.user._id);
    const { id } = this.props.match.params;
    let bookProm = getBook(id);
    bookProm.then(result => this.setState({ book: result, loading: false }));
  }

  render() {
    if (!this.state.loading) {
      const {
        title,
        authors,
        publisher,
        publishedDate,
        description,
        imageLinks
      } = this.state.book.volumeInfo;
      return (
        <div>
          {/* <img src={imageLinks.small} alt="" /> */}
          <h1>Detail of {title}</h1>
          <h2>From {authors.map(author => author+" ")}</h2>
          <p>      
            Published {publishedDate} by {publisher}
          </p>
          <p dangerouslySetInnerHTML={{__html: description}} />

          <CollectionCloud key={this.state.book.id} bookId={this.state.book.id} />
        </div>

      );
    } else return "loading";
  }
}

export default withAuth(BookDetail);
