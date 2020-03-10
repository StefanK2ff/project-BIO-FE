import React, { Component } from "react";
import { fullSearch } from "./../lib/bookAPI-helper";
import BookCard from "./BookCard";
import { withAuth } from "./../lib/Auth";
import SearchField from "./SearchField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

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
      <div>
      <Grid
          container
          spacing={2}
          direction="row"
          justify="flex-start"
          alignItems="flex-start">

        <SearchField
          handleChange={this.formHandleChange}
          query={this.state.query}
          searchFilter={this.state.searchFilter}
          handleSearchSettings={this.handleSearchSettings}
        />
        
        
          {this.state.visibleResults.map(book => {
            return (
              <Grid item xs={6} sm={4} md={3} lg={2} key={book.id}>
              
                <BookCard book={book} showDefault={true} />
              </Grid>
            );
          })}
        
        {this.state.results.length > 3 ? (
          !this.state.expandedSearch ? (
            <Button variant="contained" color="primary" onClick={this.toggleExpandedSearch}>
            Show more results
            </Button>
            
          ) : (
            <Button variant="contained" color="primary" onClick={this.toggleExpandedSearch}>
            Show less results
            </Button>
          )
        ) : null}

        {!this.state.expandedSearch
        
        
        ? (this.props.user 
            ? (<><Grid item xs={12} >
              <Button variant="contained" color="secondary">
                Go to collections
              </Button>
            </Grid>
            <Grid item xs={12} >
              <Button variant="contained" color="secondary">
                Go to library
              </Button>
            </Grid></>)
            : (<>
            <Grid item xs={12} >
              <Button variant="contained" color="secondary">
                Login
              </Button>
            </Grid>
            <Grid item xs={12} >
              <Button variant="contained" color="secondary">
                Signup
              </Button>
            </Grid>

            </>)
            )
        
        
        : null}
        
        
        
        </Grid>
      </div>
    );
  }
}

export default withAuth(Search);


