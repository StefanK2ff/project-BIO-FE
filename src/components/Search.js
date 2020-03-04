import React, { Component } from "react";
import fullSearch from "./../lib/bookAPI-helper";

export default class Search extends Component {
  state = {
    query: "",
    results: []
  };

  formHandleChange = async e => {
    e.preventDefault();
    let { value, name } = e.target;
    this.setState({ [name]: value });
    try {
      let results = await fullSearch(value);
      this.setState({ results: results });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div>
        <h2>Search</h2>
        <form>
          <input
            type="text"
            name="query"
            value={this.state.query}
            onChange={this.formHandleChange}
          />
        <input type="radio" id="all" name="searchFilter" value="" />
          <label for="huey">All Field</label>

          <input type="radio" id="intitle:" name="searchFilter" value="intitle:" />
          <label for="huey">Just Title</label>

          <input type="radio" id="inauthor:" name="searchFilter" value="inauthor:" />
          <label for="dewey">Just Author</label>

          <input type="radio" id="inpublisher:" name="searchFilter" value="inpublisher:" />
          <label for="louie">Just Publisher</label>

          <input type="radio" id="isbn:" name="searchFilter" value="isbn:" />
          <label for="louie">Just ISBN</label>
        </form>
        <h2>Result</h2>
        <ul>
          {this.state.results.map((book, index) => {
            return (
              <li>
                {index} - {book.volumeInfo.title}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
