import React, { Component } from "react";
import { withAuth } from "./../lib/Auth";
import CollectionCard from "./../components/CollectionCard";

class MyCollections extends Component {
  componentDidMount() {
    this.props.refresh(this.props.user._id);
  }
  render() {
    return (
      <div>
        <h1>My Collections</h1>
        <ul>
          {this.props.user.collections.map(collection => {
            return <CollectionCard collection={collection} />;
          })}
        </ul>
      </div>
    );
  }
}

export default withAuth(MyCollections);
