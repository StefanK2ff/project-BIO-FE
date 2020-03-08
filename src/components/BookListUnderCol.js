import React, { Component } from "react";
import BookLineUnderCol from "./BookLineUnderCol";
import { addBookToCollection } from "./../lib/collections-services";
import { getBook } from "./../lib/bookAPI-helper";
import { withAuth } from "./../lib/Auth";

class BookListUnderCol extends Component {
  state = {
    itemsToRemove: "",
    booklist: false,
    edited: false,
    itemsResolved: [],
    loading: false,
  };
  doMarkForRemove = id => {
    let updatedItemsToRemove = [];
    updatedItemsToRemove.push(id, ...this.state.itemsToRemove);
    this.setState({ itemsToRemove: updatedItemsToRemove }, () => {
      this.sthToSaveUpdater();
      console.log(this.state.itemsToRemove)
    });
  };
  undoMarkForRemove = id => {
    let updatedItemsToRemove = this.state.itemsToRemove;
    const i = updatedItemsToRemove.indexOf(id);
    if (i > -1) updatedItemsToRemove.splice(i, 1);
    this.setState({ itemsToRemove: updatedItemsToRemove }, () => {
      this.sthToSaveUpdater();
      console.log(this.state.itemsToRemove)
    });
  };

  sthToSaveUpdater = () => {
    if (
      typeof this.state.itemsToRemove == "object" &&
      this.state.itemsToRemove.length > 0
    ) {
      this.setState({ edited: true }, () => console.log("s.th. to update later? ", this.state.edited));
    } else this.setState({ edited: false }, () => console.log("s.th. to update later? ", this.state.edited));
  };

  toggleBookList = e => {
      if (!this.state.booklist) { this.loadBooks()} 
      this.setState({ booklist: !this.state.booklist });
  };

  saveAndClose = e => {
    let newItemList = this.props.items;
    this.state.itemsToRemove.forEach(item => {
      const i = newItemList.indexOf(item);
      if (i > -1) newItemList.splice(i, 1);
    });
    addBookToCollection(this.props.collid, newItemList, this.props.collName); //// collectionId, items, name
    this.props.refresh(this.props.user._id);
    this.setState({itemsResolved: []})
    this.toggleBookList();
  };

  loadBooks = () => {
    if (this.state.itemsResolved.length === 0) {
      this.setState({ loading: true})
      this.props.items.forEach( item => {
          let bookProm = getBook(item);
          bookProm.then(result => {
            let bookArray = []
            bookArray.push(result, ...this.state.itemsResolved)
            this.setState({
              itemsResolved: bookArray
            }, () => {if (this.state.itemsResolved.length === this.props.items.length) {
              this.setState({loading: false}, () => console.log("finished loading: ", this.state.itemsResolved))}});
          });
        
      });
      
    }
  }

  render() {
    return (
      <div>
        {!this.state.booklist 
          ? (this.props.items.length > 0 ? <button onClick={this.toggleBookList}>Show books</button> : null)
          : (this.state.loading 
              ? ("Currently loading")
              : (
                <div>

                  {!this.state.edited
                  ? <button onClick={this.toggleBookList}>Hide Books</button>
                  : <button onClick={this.saveAndClose}>Save & Hide</button>
                  }
                  <ul>
                    {this.state.itemsResolved.map(book => {
                      return (
                        <BookLineUnderCol
                          key={book.id}
                          book={book}
                          doMarkForRemove={this.doMarkForRemove}
                          undoMarkForRemove={this.undoMarkForRemove}
                        />
                      );
                    })}
                  </ul>
                </div>
              ))
        }
      </div>
    );
  }
}

export default withAuth(BookListUnderCol)