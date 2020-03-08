import React, { Component } from "react";
import { withAuth } from "./../lib/Auth";
import BookFilter from "./../components/BookFilter"
import BookLibraryListing from "./../components/BookLibraryListing"

class Library extends Component {
  state = {
    allBookIds : [],
    loadedBook : [],
    loading: true,
    nrOfAllBooks: 0,
    nrOfBooksLoaded: 0,
    nrOfBooksPerLoad: 10
  }
  componentDidMount() {
    //collect all book ids out of all collections
    let idArray = []
    this.props.user.collections.forEach(collection => {
      console.log("current collection: ", collection.name)
      collection.items.map(item => {
        console.log("current item: ", item)
        idArray.push(item)
      })
      
    })

    console.log(idArray)
    
    const uniqueIds = new Set(idArray)
    let allBookIds = [...uniqueIds]
    console.log(allBookIds)
    //load first set of books
  }

  consolidateBookIds = () => {
    //join all collection arrays
    //throw out all dublicates
    //set state allBookIds
  }

  loadBooks = () => {
    // similar to books under collection list
  }
  render() {
    return (
      <div>
        <h1>My Library</h1>
        <h2>See all your books, {this.props.user.username}</h2>
        <BookFilter />
        <BookLibraryListing />
      </div>
      
    );
  }
}

export default withAuth(Library);
