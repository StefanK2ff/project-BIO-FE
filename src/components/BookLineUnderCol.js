import React, { Component } from 'react'
import {getBook} from "./../lib/bookAPI-helper";

export default class BookLineUnderCol extends Component {
    state = {
        title: "",
        authors: []
    }
    getBookDetails = async(id) => {
        try {
            let results = await getBook(id);
            this.state.expandedSearch
              ? this.setState({ visibleResults: results })
              : this.setState({ visibleResults: results.slice(0, 4) });
            this.setState({ results: results });
          } catch (error) {
            console.log(error);
          }
    }
    componentDidMount () {
        this.getBookDetails(this)
    }
    render() {
        return (
            <div>Line
                
            </div>
        )
    }
}
