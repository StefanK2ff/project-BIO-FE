import React, { Component } from "react";
import {
  modifyCollection,
  deleteCollection
} from "./../lib/collections-services";
import BookListUnderCol from "./BookListUnderCol";
import { withAuth } from "./../lib/Auth";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";


class CollectionCard extends Component {
  state = {
    editmode: false,
    expanded: ""
  };

  nameEditField = e => {
    e.preventDefault();
    this.setState({ editmode: true }); // anti pattern - ok?
  };

  

  saveName = async (newName) => {
    if (newName !== this.props.collection.name && typeof newName !== "object") {
      try {
        await modifyCollection(
          this.props.collection._id,
          this.props.collection.items,
          newName
        );
      } catch (error) {
        console.log("error while saving", error);
      }
    }
    this.props.refresh(this.props.user._id);
    this.setState({ editmode: false });
  };

  setExpanded = panelId => {
    panelId === this.state.expanded
      ? this.setState({ expanded: "" })
      : this.setState({ expanded: panelId });
  };

  deleteCollection = () => {
    deleteCollection(this.props.collection._id);
    this.props.refresh(this.props.user._id);
  };

  render() {
    const { name, items, _id } = this.props.collection;
    return (
      <ExpansionPanel
        expanded={this.state.expanded === _id}
        onChange={() => this.setExpanded(_id)}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id={_id}
        >
          {" "}
          <Typography vairant="body1">
            #{name}
          </Typography>
          <Box ml="10px">
            <Typography variant="caption" color="secondary">
              {items.length} item(s)
            </Typography>
          </Box>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          
            {this.state.expanded && items.length > 0 ? (
              <BookListUnderCol
                editModeActive={this.state.editmode}
                enabelEdit={this.nameEditField}
                
                saveName={this.saveName}
                formHandleChange={this.formHandleChange}
                key={_id}
                collid={_id}
                collName={name}
                items={items}
              />
            ) : (
              <Box>
                <p>"No books in that collection."</p>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.deleteCollection}
                >
                  {" "}
                  Delete?
                </Button>
              </Box>
            )}
          
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default withAuth(CollectionCard);
