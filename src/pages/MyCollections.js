import React, { Component } from "react";
import { withAuth } from "./../lib/Auth";

class MyCollections extends Component {
  componentDidMount() {
    this.props.refresh(this.props.user._id);
  }
  render() {
    return (
      <div>
        <h1>My Collection</h1>
        <ul>
        {this.props.user.collections.map((collection) => {
          return <li>{collection.name}, with {collection.items.length} item(s)</li>
        })
        }
        </ul>
        
      </div>
    );
  }
}

export default withAuth(MyCollections);
