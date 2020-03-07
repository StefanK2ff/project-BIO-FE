import React, { Component } from "react";
import { Link } from "react-router-dom";
import { addBookToCollection } from "./../lib/collections-services";
import { withAuth } from "./../lib/Auth";

export default class CollectionCard extends Component {
    state = {
        newName: "",
        editmode: false
    }
    nameEditField = (e) => {
        e.preventDefault();
        this.setState({editmode: true})
    }
    
    formHandleChange = e => {
        e.preventDefault();
        let { value, name } = e.target;
        this.setState({ [name]: value });
    }

    render() {
        const {name, items} = this.props.collection
        return (
            <div>
                {this.state.editmode
                ? (<li><button onClick={this.saveName}>Save name</button> {name}, with {items.length} item(s) </li>)
                : (<li><button onClick={this.nameEditField}>Edit name</button> {name}, with {items.length} item(s) </li>)}
            </div>
        )
    }
}
