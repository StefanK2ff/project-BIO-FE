import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {getImage} from "./../lib/bookAPI-helper"
import Box from '@material-ui/core/Box'
import Button from "@material-ui/core/Button";

import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarIcon from '@material-ui/icons/Star';

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


const displayRating = rating => {
if (rating < 0.5) {return <> <StarBorderIcon /> <StarBorderIcon /> <StarBorderIcon /> <StarBorderIcon /> <StarBorderIcon /></>}
else if (rating < 1) {return <> <StarHalfIcon /> <StarBorderIcon /> <StarBorderIcon /> <StarBorderIcon /> <StarBorderIcon /></>}
else if (rating < 1.5) {return <> <StarIcon /> <StarBorderIcon /> <StarBorderIcon /> <StarBorderIcon /> <StarBorderIcon /></>}
else if (rating < 2) {return <> <StarIcon /> <StarHalfIcon /> <StarBorderIcon /> <StarBorderIcon /> <StarBorderIcon /></>}
else if (rating < 2.5) {return <> <StarIcon /> <StarIcon /> <StarBorderIcon /> <StarBorderIcon /> <StarBorderIcon /></>}
else if (rating < 3) {return <> <StarIcon /> <StarIcon /> <StarHalfIcon /> <StarBorderIcon /> <StarBorderIcon /></>}
else if (rating < 3.5) {return <> <StarIcon /> <StarIcon /> <StarIcon /> <StarBorderIcon /> <StarBorderIcon /></>}
else if (rating < 4) {return <> <StarIcon /> <StarIcon /> <StarIcon /> <StarHalfIcon /> <StarBorderIcon /></>}
else if (rating < 4.5) {return <> <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon /> <StarBorderIcon /></>}
else if (rating < 5) {return <> <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon /> <StarHalfIcon /></>}
else  {return <> <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon /></>}
}

export default function BookProfile(props) {
  const {
    title,
    subtitle,
    authors,
    publisher,
    publishedDate,
    description,
    imageLinks,
    averageRating,
    ratingsCount
  } = props.book.volumeInfo;

  const classes = useStyles();
  return (
      
        <Grid container spacing={3}>
        <Grid item xs>
        {/* Go Back button */}
        </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} id={"imageContainer"}>
                  {!imageLinks.small ? (
                    <img src="images/Image-Coming-Soon.png" alt="" />
                  ) : (
                    <img src={getImage(imageLinks.small)} alt="" />
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
                    <Box>
                    {!ratingsCount || ratingsCount < 2
                    ? "not rated"
                    : ("Rating: " + averageRating + " (From " + ratingsCount +" votes.") }
                    </Box>
                    <Box>
                    {!ratingsCount || ratingsCount < 2
                    ? <> <StarBorderIcon /> <StarBorderIcon /> <StarBorderIcon /> <StarBorderIcon /> <StarBorderIcon /></>
                    : <> {displayRating(averageRating)} </>}
                    </Box>
                      
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
      
  );
}
