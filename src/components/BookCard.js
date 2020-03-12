import { withAuth } from "./../lib/Auth";

import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import DefaultCollectionButton from "./DefaultCollectionButton";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

function trimString(string, end) {
  if (string.length > end) return string.substring(string, end)+"..."
  else return string
}

function BookCard(props) {

  const imageLink = !props.book.volumeInfo.imageLinks
    ? "images/Image-Coming-Soon.png"
    : props.book.volumeInfo.imageLinks.thumbnail;
  const title = !props.book.volumeInfo.title
    ? "Without title"
    : trimString(props.book.volumeInfo.title, 30)
  const releaseInfoFull = !props.book.volumeInfo.authors
    ? "Unknown Authors"
    : props.book.volumeInfo.authors.map(author => " " + author);
  const releseInfoCropped = trimString(releaseInfoFull.toString(), 30)

  return (
    <Card key={props.book.id}>
      <CardActionArea component={Link} to={`/book/${props.book.id}`}>
        <CardMedia
          className="bookListImage"
          component="img"
          alt={title}
          height="250"
          image={imageLink}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}  <ArrowForwardIcon color="secondary" fontSize="small" />
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {releseInfoCropped}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {props.user && props.showDefault ? (
          <DefaultCollectionButton bookId={props.book.id} />
        ) : ( props.user && !props.showDefault ? null :
          <Button size="small" color="secondary" component={Link} to="/login">
            log in to continue
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default withAuth(BookCard);
