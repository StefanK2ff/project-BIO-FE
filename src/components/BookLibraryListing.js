import React, { Component } from "react";
import BookCard from "./BookCard";
import { withAuth } from "./../lib/Auth";
import Box from '@material-ui/core/Box'

import CollectionCloud from "./CollectionCloud";
import Grid from "@material-ui/core/Grid";

class BookLibraryListing extends Component {
  state = {
    books: null,
    loading: true
  }
  
  componentDidMount() {
    this.setState({books: this.props.loadedbooks}, () => this.setState({loading: true}))
  }
  render() {
    return (
      <Grid container spacing={3}>
        {this.props.loadedBooks.map(book => {
          return (
            
            <Grid item xs={12} sm={6} md={4} key={book.id}>
            
              <BookCard book={book} showDefaul={false}/>
              <Box my="10px">
              <CollectionCloud bookId={book.id} />
              </Box>
            </Grid>
            
          );
        })}
        </Grid>
    );
  }
}

export default withAuth(BookLibraryListing);


