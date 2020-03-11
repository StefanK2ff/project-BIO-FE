import { useHistory } from "react-router-dom";
import React from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Box from "@material-ui/core/Box";


function BackButton() {
  let history = useHistory();

  function handleClick() {
      console.log(history)
    history.goBack();
  }

  return (
    <button type="button" onClick={handleClick}>
    <Box px="15px">
      <ArrowBackIosIcon />
      </Box>
    </button>
  );
}

export default (BackButton)