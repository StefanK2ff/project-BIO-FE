import React, { Component } from "react";
import { Link } from "react-router-dom";


export default class BookLineUnderCol extends Component {
  state = {
    markedForRemoval: false,
    buttonText: "Remove"
  };

  componentDidMount() {
    
  }

  toggleRemove = e => {
    e.preventDefault();
    let removalMarker = !this.state.markedForRemoval;
    let buttonText = this.state.buttonText === "Remove" ? "Keep" : "Remove";
    this.setState({ markedForRemoval: removalMarker, buttonText: buttonText });
    removalMarker
      ? this.props.doMarkForRemove(this.props.book.id)
      : this.props.undoMarkForRemove(this.props.book.id);
  };

  render() {
    return (
      <li key={this.props.book.id}>
          <span>
          <Link to={`/book/${this.props.book.id}`}>{this.props.book.volumeInfo.title} </Link> - {this.props.book.volumeInfo.authors.map((a) => a)}
            <button onClick={this.toggleRemove}>{this.state.buttonText}</button>
          </span>

      </li>
    );
  }
}