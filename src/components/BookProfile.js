import React from 'react'

export default function BookProfile(props) {
    const {
        title,
        authors,
        publisher,
        publishedDate,
        description,
        imageLinks
      } = this.props.book.volumeInfo;
    return ( 
        <div>
           {!imageLinks.small 
               ? <img src="images/Image-Coming-Soon.png" alt="" />
               : <img src={imageLinks.small} alt="" /> }
            <h1>
            {!title
            ? "Without title"
            : {title}}
            </h1>
            <h3>
            {!authors
            ? "Unknown Autohs"
            : "From "+ (authors.map(author => author+" "))}
            </h3>
            <p>
            {
                !publisher
                ? null
                : ("Published" (!publishedDate
                                ? null
                                :publishedDate) +
               "by" + publisher)
            }
          </p>
          {
              !description
              ? "Description currently not available"
              : <p dangerouslySetInnerHTML={{__html: description}} />
          }
        </div>
    )
}
