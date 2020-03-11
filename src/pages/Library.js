import React, { Component } from "react";
import { withAuth } from "./../lib/Auth";
import BookFilter from "./../components/BookFilter";
import BookLibraryListing from "./../components/BookLibraryListing";
import { getBook } from "./../lib/bookAPI-helper";
import PageTitle from "./../components/PageTitle"
import CircularProgress from '@material-ui/core/CircularProgress';

class Library extends Component {
  state = {
    allBookIds: [],
    loadedBooks: [],
    loadedBooksDisplay: [],
    loading: true,
    nrOfAllBooks: 0,
    nrOfBooksLoaded: 0,
    nrOfBooksPerLoad: 10
  };

  componentDidMount() {
    let consolidateId = [];
    const result = this.consolidateBookIds();
    consolidateId = result;
    this.setState({ allBookIds: consolidateId }, () => {
      this.loadBooks(consolidateId).then(resultFromAPI => {
        this.setState(
          { loadedBooks: resultFromAPI, loadedBooksDisplay: resultFromAPI },
          () => this.setState({ loading: false })
        );
      });
    });
  }

  consolidateBookIds = () => {
    let idArray = [];
    this.props.user.collections.forEach(collection => {
      collection.items.map(item => idArray.push(item));
    });
    const uniqueIds = new Set(idArray);
    let allBookIds = [...uniqueIds];
    return allBookIds;
  };

  loadBooks = ids => {
    const bookPromises = ids.map(id => {
      return getBook(id);
    });
    return Promise.all(bookPromises);
  };

  filterList = query => {
    let loadedBooksCopy = [...this.state.loadedBooks];
    loadedBooksCopy = loadedBooksCopy.filter(book =>
      book.volumeInfo.title.toLowerCase().includes(query.toLowerCase())
    );
    this.setState({ loadedBooksDisplay: loadedBooksCopy });
  };

  render() {
    return (
      <>
        <PageTitle headline="My Library" subtitle="Your books in one place" />
        {this.state.loading ? (
          <CircularProgress />
        ) : (
          <>
            <BookFilter filterList={this.filterList} />
            <BookLibraryListing loadedBooks={this.state.loadedBooksDisplay} />
          </>
        )}
      </>
    );
  }
}

export default withAuth(Library);
