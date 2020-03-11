import React from 'react'
import Search from "./../components/Search"
import PageTitle from '../components/PageTitle';

function Home() {
  return (
    <> 
    <PageTitle headline="Books I Own" subtitle ="Manage books as easy as never before" />
    <Search />
    </>
  )
}

export default Home;