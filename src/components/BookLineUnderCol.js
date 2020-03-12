import React, { Component } from "react";

import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import IconButton from "@material-ui/core/IconButton";
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';


export default class BookLineUnderCol extends Component {
  state = {
    markedForRemoval: false,
    buttonText: "Remove"
  };

  ListItemLink = (props) => {
    return <ListItem button component="a" {...props} />;
  }

  componentDidMount() {}

  toggleRemove = e => {
    e.preventDefault();
    let removalMarker = !this.state.markedForRemoval;
    let buttonText = this.state.buttonText === "Remove" ? "Keep" : "Remove";
    this.setState({ markedForRemoval: removalMarker, buttonText: buttonText });
    removalMarker
      ? this.props.doMarkForRemove(this.props.book.id)
      : this.props.undoMarkForRemove(this.props.book.id);
  };

  render() {
    return (
      <ListItem key={this.props.book.id } className="bookLineUnderCollectionText">
        <this.ListItemLink href={`/book/${this.props.book.id}`}>
        <ListItemAvatar>
          <Avatar src= {this.props.book.volumeInfo.imageLinks.smallThumbnail }/>
           
          </ListItemAvatar>
          <ListItemText
            
            primaryTypographyProps = {{"color" : !this.state.markedForRemoval ? "textPrimary": "textSecondary" }}
            primary={this.props.book.volumeInfo.title ? this.props.book.volumeInfo.title : null}
            secondary={
              this.props.book.volumeInfo.authors ? this.props.book.volumeInfo.authors.map(a => a) : null
            }
          />
        </this.ListItemLink>
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={this.toggleRemove}
          >
            {this.state.markedForRemoval ? <RestoreFromTrashIcon />: <DeleteIcon />}
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}
