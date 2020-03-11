import React from 'react'
import Search from "./../components/Search"
import Typography from "@material-ui/core/Typography";

function Home() {
  return (
    <> 
    <Typography paragraph variant="h3">
    Books I Own
    </Typography>
    <Typography paragraph variant="subtitle1">
    Manage your books <strong>as easy as never before</strong>.
    </Typography>
    <Search />
    </>
  )
}

export default Home;