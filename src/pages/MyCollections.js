import React, { Component } from "react";
import { withAuth } from "./../lib/Auth";
import CollectionCard from "./../components/CollectionCard";
import PageTitle from "./../components/PageTitle"

class MyCollections extends Component {
  componentDidMount() {
    this.props.refresh(this.props.user._id);
  }
  render() {
    return (
      <>
        <PageTitle headline="My Collections" />
        
          {this.props.user.collections.map(collection => {
            return <CollectionCard key={collection._id} collection={collection} />;
          })}
        
      </>
    );
  }
}

export default withAuth(MyCollections);
