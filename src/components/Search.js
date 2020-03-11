import React, { Component } from "react";
import { fullSearch } from "./../lib/bookAPI-helper";
import BookCard from "./BookCard";
import { withAuth } from "./../lib/Auth";
import SearchField from "./SearchField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Box from '@material-ui/core/Box'

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
    console.log(e.taget);
    this.setState({ searchFilter: e.target.value });
  };
  //xs, sm, md, lg, and xl
  render() {
    return (
      <>
        <Grid
          container
          spacing={0}
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          <SearchField
            handleChange={this.formHandleChange}
            query={this.state.query}
            searchFilter={this.state.searchFilter}
            handleSearchSettings={this.handleSearchSettings}
          />
        </Grid>

        <Box my="15px">
        <Grid

          container
          spacing={2}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          {this.state.visibleResults.map(book => {
            return (
              <Grid item xs={6} sm={4} md={3} lg={2} key={book.id}>
                <BookCard book={book} showDefault={true} />
              </Grid>
            );
          })}
        </Grid>
        </Box>

        <Box my="15px">
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          {this.state.results.length > 3 ? (
            !this.state.expandedSearch ? (
              <Button
                mt={4}
                variant="contained"
                color="primary"
                onClick={this.toggleExpandedSearch}
              >
                Show more results
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={this.toggleExpandedSearch}
              >
                Show less results
              </Button>
            )
          ) : null}

          {!this.state.expandedSearch ? (
            this.props.user ? (
              <>
                <Grid item xs={12}>
                  <Button variant="contained" color="secondary" component={Link} to="/collections">
                    Go to collections
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="secondary" component={Link} to="/library">
                    Go to library
                  </Button>
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12}>
                  <Button variant="contained" color="secondary" component={Link} to="/login">
                    Login
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="secondary" component={Link} to="/signup">
                    Signup
                  </Button>
                </Grid>
              </>
            )
          ) : null}
        </Grid>
        </Box>
      </>
    );
  }
}

export default withAuth(Search);