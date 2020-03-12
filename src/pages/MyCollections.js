import React, { Component } from "react";
import { withAuth } from "./../lib/Auth";
import CollectionCard from "./../components/CollectionCard";
import PageTitle from "./../components/PageTitle"
import AddEmptyCollection from "./../components/AddEmptyCollection"

class MyCollections extends Component {
  state = {
    nothing: ""
  }

  updateColl = () => {
    this.setState({nothing: ""})
  }

  componentDidMount() {
    this.props.refresh(this.props.user._id);
  }
  render() {
    return (
      <>
        <PageTitle headline="My Collections" />
        <AddEmptyCollection updateColl={this.updateColl}/>
        
          {this.props.user.collections.map(collection => {
            return <CollectionCard key={collection._id} collection={collection} />;
          })}
        
      </>
    );
  }
}

export default withAuth(MyCollections);
