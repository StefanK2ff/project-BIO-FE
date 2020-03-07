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
            authorsString = authorsString + author;
        })
        this.setState({title: result.volumeInfo.title, authors: authorsString, loading: false});
        })
    }

    toggleRemove = e => {
        e.preventDefault();
        this.setState({markedForRemoval: !this.state.markedForRemoval, buttonText: this.state.buttonText === "Remove" ? "Keep" : "Remove"})
    }

    render() {
        return (
            <div>
            {this.state.loading
            ? "loading"
            : <span>{this.state.title} - {this.state.authors} <button onClick={this.toggleRemove}>{this.state.buttonText}</button></span>} 
            </div>
        )
    }
}
