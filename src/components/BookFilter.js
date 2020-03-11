import React, { Component } from "react";

import TextField from "@material-ui/core/TextField";

export default class BookFilter extends Component {
  state = {
    query: ""
  };

  handleChange = e => {
    e.preventDefault();
    let { value, name } = e.target;
    this.props.filterList(value);
    this.setState({ [name]: value });
  };

  render() {
    return (
      <>
        <form noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="query"
            label="Filter by title"
            name="query"
            autoFocus
            type="text"
            value={this.state.query}
            onChange={this.handleChange}
          />
        </form>
      </>
    );
  }
}
