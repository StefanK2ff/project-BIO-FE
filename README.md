# Project BIO - Books I Own Frontend

Overview:

Project BIO - Books I Own is a copycat of the core functionality of sites like goodreads. So BIO  is similar to this  social cataloging site that allows users to 

1. freely search a database of books (Google books API)
2. add them to their list of books they own
3. categorize them (in own collections)
4. and and perform different actions on the collections

## API to use

[https://developers.google.com/books/docs/overview](https://developers.google.com/books/docs/overview)

* Well documented
* Performant
* Oauth

## Frontend

Use [https://designrevision.com/docs/shards-react/](Shards for React (UI Kit builded with bootstrap))

## Further Ideas

* Include second API to read barcode

  * [https://developers.google.com/vision/android/barcodes-overview](https://developers.google.com/vision/android/barcodes-overview) 

* Include third API to get recommendations

  * [https://www.programmableweb.com/api/readgeek](https://www.programmableweb.com/api/readgeek)

  * [https://www.programmableweb.com/api/tastekid](https://www.programmableweb.com/api/tastekid)

* Explore mode

* Lazy loader for long listing pages ….

# User Stories

* As a user I want to log in / authenticate..

* As a user I want to add books to a personal list to mark them as my books / books I own.

* As a user I want to remove books from the list because I don’t own them anymore

* As a user I want to organize my books as flexible as possible to keep track of things if find important. examples: 

  * "lend" if i gave them to others

  * "not read" - to mark them as not yet read

  * "favorite"

  * "again"

  * "intense"

  * "sell-soon"

* As a user I want to edit that organization connected to book if I find it does not apply anymore

* As a user I want to see all book that organized under a shared topic to see if its still accurate or if action is needed

* As a user I want to search for books in the my books collection

* As a user I want to see details of certain book to look up metadata and to organize them.

# Wireframes

→ [https://mockflow.com/](https://wireframepro.mockflow.com/editor.jsp?editor=on&publicid=M280d7ec9ac5d21feea12c836590445111582988930420&perm=Create&projectid=M383316e67880ae362e23c6c68479b3ef1582988963227&ptitle=Project%20BIO&bgcolor=white&category=bootstrap4#/page/D1c658959a0692751768f7f9a0b72ecf7)


# User Flow

**Not logged in**

* all routes except index and login are private

* Search for books is possible

* CTAs from index are all

  * going to sign up / login

  * buttons are named differently ("login to proceed")

**Logged in**

* FROM Startpage

  * VIA Search suggestion w/ link: see all results TO → SERP → Book details

  * VIA Search suggestion w/ concrete suggestions of a book w/ link  TO → book details

  * VIA Button "Browse my library" TO → Library with no filter, sorted Alphabetical

  * VIA Buttons "Browse collection "xyz" TO → Library with predefined filter

  * VIA Button TO → manage collections

* FROM Book Detail

  * VIA author name (link) TO → SERP search all books for specific author [not mvp]

  * VIA back-button TO → Last location known

* FROM Library

  * VIA specific book Listing TO → Book Details

  * VIA Filters on list; filter Options

    * Type in name or author; list gets dynamically reduced

    * Klick on 1+ "collection-tags"; list gets dynamically reduced

* FROM Manage collections

  * VIA Button per collection "see collection" TO → Library with preset filter

  * VIA back-button TO → Last location known


## Available Endpoints (public)

* Performing a search

  * https://www.googleapis.com/books/v1/volumes?q=search+terms

* Performing a search for a special field

  * Add keywords to query:

    * intitle: Returns results where the text following this keyword is found in the title.

    * inauthor: Returns results where the text following this keyword is found in the author.

    * inpublisher: Returns results where the text following this keyword is found in the publisher.

    * subject: Returns results where the text following this keyword is listed in the category list of the volume.

    * isbn: Returns results where the text following this keyword is the ISBN number.

  * Example: 

    * `GET https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&[key](https://developers.google.com/books/docs/v1/using#key)=yourAPIKey`

* Retrieving a specific volume

  * [https://www.googleapis.com/books/v1/volumes/volumeId](https://www.googleapis.com/books/v1/volumes/volumeId)

## Provided Book info (excerpt)

<table>
  <tr>
    <td>Name</td>
    <td>Type</td>
    <td>Comment / Usage</td>
  </tr>
  <tr>
    <td>googleId</td>
    <td>String</td>
    <td></td>
  </tr>
  <tr>
    <td>etag</td>
    <td>String</td>
    <td>Not required?</td>
  </tr>
  <tr>
    <td>volumeInfo</td>
    <td>Object</td>
    <td></td>
  </tr>
  <tr>
    <td> ↳ title</td>
    <td>String</td>
    <td>For filter, detail page</td>
  </tr>
  <tr>
    <td> ↳ subtitle</td>
    <td>String</td>
    <td>Detail page</td>
  </tr>
  <tr>
    <td> ↳ authors</td>
    <td>Array</td>
    <td>For filter, detail page</td>
  </tr>
  <tr>
    <td>publisher</td>
    <td>String</td>
    <td>Detail page</td>
  </tr>
  <tr>
    <td>publishingDate</td>
    <td>String</td>
    <td>Detail page</td>
  </tr>
  <tr>
    <td>description</td>
    <td>String</td>
    <td>Detail page</td>
  </tr>
  <tr>
    <td>industryidentifiers</td>
    <td>Object</td>
    <td></td>
  </tr>
  <tr>
    <td> ↳ isbn_10</td>
    <td>String</td>
    <td>Detail page</td>
  </tr>
  <tr>
    <td> ↳ isbn_13</td>
    <td>String</td>
    <td>Detail page</td>
  </tr>
  <tr>
    <td>pageCount</td>
    <td>Number</td>
    <td>Detail page</td>
  </tr>
  <tr>
    <td>printType</td>
    <td>String</td>
    <td>Detail page</td>
  </tr>
  <tr>
    <td>categorries</td>
    <td>Array</td>
    <td>Auto tag?</td>
  </tr>
  <tr>
    <td>averageRating</td>
    <td>Number</td>
    <td>Detail page</td>
  </tr>
  <tr>
    <td>ratingCount</td>
    <td>Number</td>
    <td>Detail page</td>
  </tr>
  <tr>
    <td>imagelinks</td>
    <td>Object</td>
    <td></td>
  </tr>
  <tr>
    <td> ↳ thumb</td>
    <td>String</td>
    <td>Listing page</td>
  </tr>
  <tr>
    <td> ↳ medium</td>
    <td>String</td>
    <td>Detail page</td>
  </tr>
  <tr>
    <td>language</td>
    <td>String</td>
    <td>Auto tag?</td>
  </tr>
</table>



# Frontend routes and views

<table>
  <tr>
    <td>FE route</td>
    <td>View</td>
    <td>Same in BE?</td>
    <td>Public?</tb>
    <td>Functionality</td>
  </tr>
  <tr>
    <td>/signup</td>
    <td>Signup Comp.</td>
    <td>y</td>
    <td>y</td>
    <td>Adds new user to user collection</td>
  </tr>
  <tr>
    <td>/login</td>
    <td>Login Comp.</td>
    <td>y</td>
    <td>y</td>
    <td>Logs in existing user</td>
  </tr>
  <tr>
    <td>/collections
</td>
    <td>MyCollection Comp.</td>
    <td>y</td>
    <td>n</td>
    <td>Gets all collections from BE, Posts changes to BE</td>
  </tr>
  <tr>
    <td>/collections/:id</td>
    <td>MyCollection- Detail Comp.</td>
    <td>y</td>
    <td>n</td>
    <td>Gets details from a specific collection from
performs a API call to retrieve all book data
Sends changes to BE
Deletes all Collection</td>
  </tr>
  <tr>
    <td>/library</td>
    <td>Library Comp.</td>
    <td>n</td>
    <td>n</td>
    <td>Get all books connected to "my books collection"
Performs a Search on API to display listing</td>
  </tr>
  <tr>
    <td>/book/:gid</td>
    <td>BookDetail Comp.</td>
    <td>n</td>
    <td>n</td>
    <td>Performs a Api call to retrieve a specific book</td>
  </tr>
  <tr>
    <td>/</td>
    <td>Library Comp.</td>
    <td>n </td>
    <td>y</td>
    <td>Performs Api calls to search</td>
  </tr>
</table>



# Frontend: Helper Functions

* (Work in progress)

  * Axios request backend

    * gets collections array from user to update the state

  * Checks if the state provided by the Current User is valid (so user is logged in)

* GetBookById

  * Axios request to google

  * Takes 1 params to define how many data should come back

    * slim: for listings and suggestions. Jsut title, thumb, author

    * extended: for book detail view

* SearchBy

  * Axios request to google

  * Takes 1 arg to define if its a full or a specific search

  * Takes 1 arg to define how many data should come back

# Frontend: Component planning

## Needed Provider: UserProvider

```
<CurrentUser.Provider value={{..this.state, this.someFunc}}>
	{this.props.children}
</CurrentUser.Provider>
//...


export default CurrentUserProvider;
```


**State Props**

* UserID - to identify the current user

* SessionID - must be the same as the backend know, otherwise its not true

* His Collections Array of Objects

* username

## Global - on every page: Header Component (public)

```
<Header>
  <Navigation />
  <NameSection />
</Header>
```

**Notes: **

* Navigation depends on <UserProvider> logged in state tho show

  * If logged in

    * my Collections

    * my library

    * logged out

  * If not logged in

    * sign up

    * log in

* NameSection contains always

  * H1 of page

  * and a subheadline

## Signup Component

## Login Component

## Startpage Component (public)

```
<Startpage>
  <Search>
    <Searchfield />
    <Searchcontrols />
    <Suggestions />
    <SERP Link />
  </Search>
    <PageControls / >
</Startpage>
```

**Notes**

* Input in Searchfield should retrieve real time search suggestions with [autocomplete.js](https://www.npmjs.com/package/autocomplete-js)

* Search Control Field enables to limit search to a field

* SERP Link displays the full result from API in a different component

* Page controls

  * If logged in:

    * Go to Library

    * Show Collection

  * If logged out: show message "please log in to use this app fully"

## Library Component (private)

```
<Library>
  <FilterArea>
    <TextFilter />
    <CollectionFilter />
  </ FilterArea>
  <BooksListing / > loops over <BookCard>
</Library>
```

**Notes**:

* Works with the foll array of all Books in the "myBooks" collection of the user
* When Library component loads, all data from google is received?

* Filter Area

  * TestFilter performs a real time filter over the array of books

  * ColelctionsFloud could be toggable

## BookDetail Component (public)

```
<BookDetail>
  <BookData>
  <BookControl>
</BookDetail>
```

**Notes**:

* BookData gets all the data from the API

* BookControls

  * Shows all available collections and highlights in which the book is

  * Tapping on collections changes the collection

## MyCollections Component

<table>
  <tr>
    <td><CurrentUserProvider>
<MyCollections>
  <TextFilter>
  <CollectionsList> loops over CollectionCard
</MyCollections>
</CurrentUserProvider></td>
  </tr>
</table>



**Notes**:

* TextFilter filters in real time over array of collection by name

* Collections cards contains controls to edit or edit collection

## MyCollectionDetail

→ Similar to Library Book List

```
<CurrentUserProvider>
<FilterArea>
    <TextFilter />
    <CollectionFilter />
  </ FilterArea>
  <BooksListing / > loops over <BookCard>
</MyCollectionDetail>
```



# Setup

Trello:			[https://trello.com/b/3H9BU1mN/ironhack-project-bio](https://trello.com/b/3H9BU1mN/ironhack-project-bio)

Backend Repo:	[https://github.com/StefanK2ff/project-BIO-BE](https://github.com/StefanK2ff/project-BIO-BE)

Frontend Repo:	[https://github.com/StefanK2ff/project-BIO-FE](https://github.com/StefanK2ff/project-BIO-FE)


