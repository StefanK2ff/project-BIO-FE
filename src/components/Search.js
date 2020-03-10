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
    console.log(e.taget)
    this.setState({ searchFilter: e.target.value });
  };

  render() {
    return (
      <div>
        
        <SearchField
          handleChange={this.formHandleChange}
          query={this.state.query}
          searchFilter={this.state.searchFilter}
          handleSearchSettings={this.handleSearchSettings}
          />
        
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
