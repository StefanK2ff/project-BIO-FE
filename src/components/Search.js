import React, { Component } from "react";
import { fullSearch } from "./../lib/bookAPI-helper";
import BookCard from "./BookCard";
import { withAuth } from "./../lib/Auth";
import DefaultCollectionButton from "./DefaultCollectionButton";
import { Link } from "react-router-dom";
import SearchField from "./SearchField";

class Search extends Component {
  state = {
    searchFilter: "",
    query: "",
    results: [],
    visibleResults: [],
    expandedSearch: false
  };
  componentDidMount() {
    if (this.props.user) this.props.refresh(this.props.user._id);
  }

  toggleExpandedSearch = () => {
    this.setState({ expandedSearch: !this.state.expandedSearch });
    !this.state.expandedSearch
      ? this.setState({ visibleResults: this.state.results })
      : this.setState({ visibleResults: this.state.results.slice(0, 4) });
  };

  formHandleChange = async e => {
    e.preventDefault();
    let { value, name } = e.target;
    this.setState({ [name]: value });
    try {
      let results = await fullSearch(value, this.state.searchFilter, 40);
      this.state.expandedSearch
        ? this.setState({ visibleResults: results })
        : this.setState({ visibleResults: results.slice(0, 4) });
      this.setState({ results: results });
    } catch (error) {
      console.log(error);
    }
  };

  handleSearchSettings = e => {
    this.setState({ searchFilter: e.target.value });
  };

  render() {
    return (
      <div>
        
        <SearchField />
        <form>
          <input
            type="text"
            name="query"
            value={this.state.query}
            onChange={this.formHandleChange}
          />
          <input
            type="radio"
            id="all"
            name="searchFilter"
            value=""
            onChange={this.handleSearchSettings}
            checked={this.state.searchFilter === ""}
          />
          <label htmlFor="all">All Fields</label>

          <input
            type="radio"
            id="intitle:"
            name="searchFilter"
            value="intitle:"
            onChange={this.handleSearchSettings}
            checked={this.state.searchFilter === "intitle:"}
          />
          <label htmlFor="intitle:">Just Title</label>

          <input
            type="radio"
            id="inauthor:"
            name="searchFilter"
            value="inauthor:"
            onChange={this.handleSearchSettings}
            checked={this.state.searchFilter === "inauthor:"}
          />
          <label htmlFor="inauthor:">Just Author</label>

          <input
            type="radio"
            id="inpublisher:"
            name="searchFilter"
            value="inpublisher:"
            onChange={this.handleSearchSettings}
            checked={this.state.searchFilter === "inpublisher:"}
          />
          <label htmlFor="inpublisher:">Just Publisher</label>

          <input
            type="radio"
            id="isbn:"
            name="searchFilter"
            value="isbn:"
            onChange={this.handleSearchSettings}
            checked={this.state.searchFilter === "isbn:"}
          />
          <label htmlFor="isbn:">Just ISBN</label>
        </form>
        <h2>Result</h2>
        <ul>
          {this.state.visibleResults.map(book => {
            return (
              <div key={book.id}>
                <BookCard  book={book} />
                {this.props.user ? (
                  
                  <DefaultCollectionButton bookId={book.id} />
                ) : (
                  <Link to="/login">
                    log in to add this book to your library.
                  </Link>
                )}
              </div>
            );
          })}
          {this.state.results.length > 3 ? (
            !this.state.expandedSearch ? (
              <button onClick={this.toggleExpandedSearch}>
                Show more results
              </button>
            ) : (
              <button onClick={this.toggleExpandedSearch}>
                Show less results
              </button>
            )
          ) : null}

          {!this.state.expandedSearch ? "some additional control" : null}
        </ul>
      </div>
    );
  }
}

export default withAuth(Search);
