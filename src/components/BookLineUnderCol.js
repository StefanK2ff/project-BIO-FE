import React, { Component } from 'react'
import {getBook} from "./../lib/bookAPI-helper";

export default class BookLineUnderCol extends Component {
    state = {
        title: "",
        authors: [],
        loading: true,
        markedForRemoval: false,
        buttonText: "Remove"
    }
    
    componentDidMount () {
    let bookProm = getBook(this.props.bookid);
    bookProm.then(result => {
        let authorsString = "";
        result.volumeInfo.authors.map((author) => {
            return authorsString = authorsString + author;
        })
        this.setState({title: result.volumeInfo.title, authors: authorsString, loading: false});
        })
    }

    toggleRemove = e => {
        //e.preventDefault();
        const bool = this.state.markedForRemoval ? false : true
        this.setState({markedForRemoval: bool, buttonText: this.state.buttonText === "Remove" ? "Keep" : "Remove"})
        
        this.state.markedForRemoval ? this.props.doMarkForRemove(this.props.bookid) : this.props.undoMarkForRemove(this.props.bookid)
    }

    render() {
        return (
            <li key={this.props.bookid}>
            {this.state.loading
            ? "loading"
            : <span>{this.state.title} - {this.state.authors} <button onClick={this.toggleRemove}>{this.state.buttonText}</button></span>} 
            </li>
        )
    }
}
