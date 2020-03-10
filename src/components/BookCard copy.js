import React, { Component } from "react";
import { Link } from "react-router-dom";

import { withAuth } from "./../lib/Auth";

class BookCard extends Component {
  render() {
    return (
      <div key={this.props.book.id}>
        <Link to={`/book/${this.props.book.id}`}>
          {!this.props.book.volumeInfo.imageLinks ? (
            <img src="images/Image-Coming-Soon.png" alt="" />
          ) : (
            <img
              src={this.props.book.volumeInfo.imageLinks.smallThumbnail}
              alt=""
            />
          )}
        </Link>

        <strong>
          {!this.props.book.volumeInfo.title
            ? "Without title"
            : this.props.book.volumeInfo.title}
        </strong>
        {!this.props.book.volumeInfo.subtitle ? null : (
          <p>{this.props.book.volumeInfo.subtitle}</p>
        )}
        <p>
          {!this.props.book.volumeInfo.authors
            ? "Unknown Authors"
            : "From " +
              this.props.book.volumeInfo.authors.map(author => author + " ")}
        </p>
      </div>
    );
  }
}

export default withAuth(BookCard);
