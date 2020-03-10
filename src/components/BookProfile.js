import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

export default function BookProfile(props) {
  const {
    title,
    subtitle,
    authors,
    publisher,
    publishedDate,
    description,
    imageLinks
  } = props.book.volumeInfo;

  const classes = useStyles();
  return (
    <div className={classes.root}>
      
        <Grid container spacing={3}>
          <Grid item xs={12} className={classes.paper}>
            <Paper className={classes.paper}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} id={"imageContainer"}>
                  {!imageLinks.small ? (
                    <img src="images/Image-Coming-Soon.png" alt="" />
                  ) : (
                    <img src={imageLinks.small} alt="" />
                  )}
                </Grid>
                <Grid item xs={12} md={6} id={"textContainer"}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                    <Typography align="left" gutterBottom>
                      <h1>{!title ? "Without title" : title}</h1>
                      {!subtitle ? null : <h2>{subtitle}</h2>}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                    <Typography align="left" gutterBottom>
                      {!authors
                        ? "Unknown Authors"
                        : "From " + authors.map(author => author + " ")}
                        </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      * * * * * RATING
                    </Grid>
                    <Grid item xs={6}>
                      {!publisher
                        ? null
                        : "Published " +
                          (!publishedDate ? null : publishedDate) +
                          " by " +
                          publisher}
                    </Grid>
                    <Grid item xs={12}>
                    <Typography align="left" gutterBottom>
                      {!description ? (
                        "Description currently not available"
                      ) : (
                        <p dangerouslySetInnerHTML={{ __html: description }} />
                      )}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      
    </div>
  );
}
