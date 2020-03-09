import React, { Component } from "react";
import { Link } from "react-router-dom";

import { withAuth } from "./../lib/Auth";

class BookCard extends Component {

  render() {
    return (
      <div key={this.props.book.id}>
        <Link to={`/book/${this.props.book.id}`}>
        <img
          src={this.props.book.volumeInfo.imageLinks.smallThumbnail}
          alt={this.props.book.volumeInfo.title}
        />
        </Link>
        <li><Link to={`/book/${this.props.book.id}`}>{this.props.book.volumeInfo.title}</Link></li>
        {/* <li>{this.props.book.volumeInfo.subtitle}</li> */}
        {this.props.book.volumeInfo.authors ? (
          <li>{this.props.book.volumeInfo.authors.map(author => author)}</li>
        ) : null}
        <li>{this.props.book.volumeInfo.publisher}</li>
      </div>
    );
  }
}

export default withAuth(BookCard);
