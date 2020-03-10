import React from "react";
import { Link } from "react-router-dom";
import { withAuth } from "./../lib/Auth";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
});

function Navbar(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const toggleDrawer = (side, open) => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      {props.isLoggedIn ? (
        <List>
          <Typography className={classes.root}>
            <ListItem
              button
              key={"My Collections"}
              component={Link}
              to="/collections"
            >
              <ListItemIcon><InboxIcon /></ListItemIcon>
              <ListItemText primary={"My Collections"} />
            </ListItem>

            <ListItem button key={"My Library"} component={Link} to="/library">
              <ListItemIcon><InboxIcon /></ListItemIcon>
              <ListItemText primary={"My Library"} />
            </ListItem>

            <Divider />

            <ListItem button key={"Logout"} onClick={props.logout}>
              <ListItemIcon><InboxIcon /></ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItem>
          </Typography>
        </List>
      ) : (
        <List>
          <ListItem button key={"Login"} component={Link} to="/login">
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary={"Login"} />
          </ListItem>

          <ListItem button key={"Sign Up"} component={Link} to="/signup">
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary={"Sign Up"} />
          </ListItem>
        </List>
      )}
    </div>
  );

  return (
    <div>
      <Button onClick={toggleDrawer("right", true)}>Menue</Button>
      <SwipeableDrawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer("right", false)}
        onOpen={toggleDrawer("right", true)}
      >
        {sideList("right")}
      </SwipeableDrawer>
    </div>
  );
}

export default withAuth(Navbar);
