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
        <>
          {this.props.user.collections.map(collection => {
            return <CollectionCard key={collection._id} collection={collection} />;
          })}
        </>
      </div>
    );
  }
}

export default withAuth(MyCollections);
