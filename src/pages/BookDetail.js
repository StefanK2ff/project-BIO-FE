import React, { Component } from "react";
import { withAuth } from "./../lib/Auth";
import { getBook } from "./../lib/bookAPI-helper";
import {createCollectionWithItems, addBookToCollection} from "./../lib/collections-services";

class BookDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: {},
      loading: true,
      newCollection: ""
    };
  }

  

  formHandleChange = async e => {
    e.preventDefault();
    let { value, name } = e.target;
    this.setState({ [name]: value });
  };

  addToNewColl = e => {
    e.preventDefault();
    createCollectionWithItems(this.props.user._id, [this.state.book.id], this.state.newCollection) //owner, items, name
    this.props.refresh(this.props.user._id);
    this.setState({newCollection: ""})
  }

  getItemList = (collectionID) => {
    return this.props.user.collections.filter(oneCol => {return oneCol._id === collectionID})[0].items
  }

  addToCollection = (e) => {
    e.preventDefault();
    let itemList = this.getItemList(e.target.id)
    let newItemList = []
    newItemList.push(this.state.book.id, ...itemList);
    addBookToCollection(e.target.id, newItemList, e.target.name) // collectionId, items, name
    this.props.refresh(this.props.user._id);
  }

  removeFromCollection = (e) => {
    e.preventDefault();
    let itemList = this.getItemList(e.target.id)
    const i = itemList.indexOf(this.state.book.id);
    if (i > -1) itemList.splice(i, 1);
    addBookToCollection(e.target.id, itemList, e.target.name) // collectionId, items, name
    this.props.refresh(this.props.user._id);
  }

  componentDidMount() {
    this.props.refresh(this.props.user._id);
    const { id } = this.props.match.params;
    let bookProm = getBook(id);
    bookProm.then(result => this.setState({ book: result, loading: false }));
  }

  inThisColl = (collectionID) => {
    let collectionItems = this.props.user.collections.filter(oneCol => {return oneCol._id === collectionID})[0].items
    if (collectionItems.includes(this.state.book.id)) return true;
    else return false
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
          <h2>From {authors.map(author => author)}</h2>
          <p>      
            Published {publishedDate} by {publisher}
          </p>
          <p dangerouslySetInnerHTML={{__html: description}} />


          <h3>Add to your collections</h3>
          <ul>
          {this.props.user.collections.map((collection) => {
            if (this.inThisColl(collection._id)) {
              return <li> <button onClick={this.removeFromCollection} id={collection._id} name={collection.name} variant="dark"> Remove from {collection.name}</button></li>
            } else {
              return <li> <button onClick={this.addToCollection} id={collection._id} name={collection.name} variant="light"> Add to {collection.name}</button></li>
            }
            
          })}
          <li>Create new collection: 
          <form>
            <input
            type="text"
            name="newCollection"
            value={this.state.newCollection}
            onChange={this.formHandleChange}
          /><button type="submit" bookid={this.state.book.id} onClick={this.addToNewColl}>Create + add</button>

          </form>
          
          
          </li>
          </ul>

          
        </div>

      );
    } else return "loading";
  }
}

export default withAuth(BookDetail);
