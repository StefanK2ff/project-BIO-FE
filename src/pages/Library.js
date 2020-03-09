import React, { Component } from "react";
import { withAuth } from "./../lib/Auth";
import BookFilter from "./../components/BookFilter";
import BookLibraryListing from "./../components/BookLibraryListing";
import { getBook } from "./../lib/bookAPI-helper";

class Library extends Component {
  state = {
    allBookIds: [],
    loadedBooks: [],
    loadedBooksDisplay:[],
    loading: true,
    nrOfAllBooks: 0,
    nrOfBooksLoaded: 0,
    nrOfBooksPerLoad: 10
  };
  componentDidMount() {
    let consolidateBookIds = this.consolidateBookIds()
      this.setState({ allBookIds: consolidateBookIds }, () => {
        console.log("1 - ids consolidated");
      })

    let loadedBooks = this.loadBooks(consolidateBookIds).then(
      console.log("2 - loaded books are read ")
    );
    
    Promise.resolve(loadedBooks).then(result => {
      console.log("resolved loadedBooks", result);
      this.setState({ loadedBooks: result, loadedBooksDisplay: result}, () => {
        console.log("3 - updated the state");
        console.log("4 - books after set state ", this.state.loadedBooks);
        this.loadhelper()
      });
    });
  //setState({loading: false})
  }

  consolidateBookIds = () => {
    let idArray = [];
    this.props.user.collections.forEach(collection => {
      collection.items.map(item => idArray.push(item));
    });
    const uniqueIds = new Set(idArray);
    let allBookIds = [...uniqueIds];
    console.log("allBookIds ", allBookIds)
    return allBookIds;
  };

  loadBooks = async ids => {
    let resultsProms = [];
    try {
      ids.forEach(id => {
        let bookProm = getBook(id);
        bookProm.then(book => {
          resultsProms.push(book);
        });
      });
    } catch (err) {
      console.log(err);
    }
    return resultsProms;
  };

  loadhelper = () => {
    if (this.state.loadedBooks[0] === undefined) {
      console.log("loading");
    } else {
      console.log(this.state.loadedBooks[0]);
    }
    setTimeout(() => {
      this.setState({ loading: false }, () => {
        console.log("5 - set sate to not loading");
        console.log(this.state.loadedBooks[0]);
      });
    }, 5000);
  };

  filterList = (query) => {
    let loadedBooksCopy =  [...this.state.loadedBooks]
    loadedBooksCopy = loadedBooksCopy.filter(book => book.volumeInfo.title.toLowerCase().includes(query.toLowerCase()))
    this.setState( {loadedBooksDisplay: loadedBooksCopy})
  }

  render() {
    return (
      <div>
        <h1>My Library</h1>
        <h2>See all your books, {this.props.user.email}</h2>
        {this.state.loading ? (
          "Books are getting loaded"
        ) : (
          <div>
            <BookFilter filterList={this.filterList} />
            <BookLibraryListing loadedBooks={this.state.loadedBooksDisplay} />
          </div>
        )}
      </div>
    );
  }
}

export default withAuth(Library);
