import React, { Component } from "react";
import { withAuth } from "../lib/Auth";
import { getBook } from "../lib/bookAPI-helper";
import {createCollectionWithItems, addBookToCollection} from "../lib/collections-services";
import CollectionCloud from "./CollectionCloud";
import BookProfile from "../components/BookProfile";

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
      return (
        <div>
          <BookProfile book={this.props.book} />

          <CollectionCloud key={this.state.book.id} bookId={this.state.book.id} />
        </div>

      );
    } else return "loading";
  }
}

export default withAuth(BookDetail);
