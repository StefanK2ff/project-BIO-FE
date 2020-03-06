import React, { Component } from "react";
import { withAuth } from "./../lib/Auth";
import { getBook } from "./../lib/bookAPI-helper";

class BookDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: {},
      loading: true
    };
  }

  addToCollection = (e) => {
    console.log(e.target)
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
          <img src={imageLinks.small} alt="" />
          <h1>Detail of {title}</h1>
          <h2>From {authors.map(author => author)}</h2>
          <p>      
            Published {publishedDate} by {publisher}
          </p>
          <p dangerouslySetInnerHTML={{__html: description}} />


          <h3>Add to your collections</h3>
          <ul>
          {this.props.user.collections.map((collection) => {
            return <li> <button onClick={this.addToCollection} id={collection._id}>{collection.name}</button></li>
          })}
          <li>Create new collection:</li>
          </ul>

          
        </div>

      );
    } else return "loading";
  }
}

export default withAuth(BookDetail);
