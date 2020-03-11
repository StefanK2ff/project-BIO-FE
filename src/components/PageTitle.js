import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";


export default function PageTitle(props) {
  const { headline, subtitle } = props;
  return (
    <Box px="15px" mt="20px">
      <Typography paragraph variant="h3">
        {headline}
      </Typography>
      {!subtitle ? null : (
        <Typography paragraph variant="subtitle1">
        {subtitle}
        </Typography>
      )}
    </Box>
  );
}