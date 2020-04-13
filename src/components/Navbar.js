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

import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";

import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SearchIcon from '@material-ui/icons/Search';

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import BackButton from "./BackButton";

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

  const handleBack = (e) =>{
    console.log(e)
    console.log(Window)
    console.log(props)
    //this.history.goBack();
  }

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
            <ListItem button key={"Search"} component={Link} to="/">
              <ListItemIcon>
                <SearchIcon />
              </ListItemIcon>
              <ListItemText primary={"Search (Home)"} />
            </ListItem>

            <ListItem
              button
              key={"My Collections"}
              component={Link}
              to="/collections"
            >
              <ListItemIcon>
                <CollectionsBookmarkIcon />
              </ListItemIcon>
              <ListItemText primary={"My Collections"} />
            </ListItem>

            <ListItem button key={"My Library"} component={Link} to="/library">
              <ListItemIcon>
                <LocalLibraryIcon />
              </ListItemIcon>
              <ListItemText primary={"My Library"} />
            </ListItem>

            <Divider />

            <ListItem button key={"Logout"} onClick={props.logout}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItem>
          </Typography>
        </List>
      ) : (
        <List>
          <ListItem button key={"Search"} component={Link} to="/">
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary={"Search (Home)"} />
          </ListItem>
          <Divider />

          <ListItem button key={"Login"} component={Link} to="/login">
            
            <ListItemText primary={"Login"} />
          </ListItem>

          <ListItem button key={"Sign Up"} component={Link} to="/signup">
            
            <ListItemText primary={"Sign Up"} />
          </ListItem>
        </List>
      )}
    </div>
  );

  return (
    <>
      <Box my="10px">
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
      <BackButton />

        <Button component={Link} to="/">
          {/* onClick={props.history.goBack()} */} <HomeIcon />
        </Button>

        <Button onClick={toggleDrawer("right", true)}>
          {" "}
          <MenuIcon />{" "}
        </Button>
      </Grid>
      </Box>

      <Grid item xs={12}>
        <SwipeableDrawer
          anchor="right"
          open={state.right}
          onClose={toggleDrawer("right", false)}
          onOpen={toggleDrawer("right", true)}
        >
          {sideList("right")}
        </SwipeableDrawer>
      </Grid>
    </>
  );
}

export default withAuth(Navbar);
