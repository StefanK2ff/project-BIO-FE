import React, { Component } from 'react'
import {fullSearch} from "./../lib/bookAPI-helper"

export default class Search extends Component {
    state = {
        query: ""
    }

    formHandleChange = e => {
        e.preventDefault();
        let { value, name  } = e.target;
        this.setState({ [name]: value });
        fullSearch(value)
    };

    render() {
        return (
            <div>
                <form>
                <input
                    type="text"
                    name="query"
                    value={this.state.query}
                    onChange={this.formHandleChange}
                />
                </form>
            </div>
        )
    }
}