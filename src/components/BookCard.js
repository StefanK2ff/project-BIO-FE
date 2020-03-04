import React from 'react'

export default function BookCard(props) {
    return (
        <div key={props.book.id}>
            <img src={props.book.volumeInfo.imageLinks.smallThumbnail} alt={props.book.volumeInfo.title}/>
            <li>{props.book.volumeInfo.title}</li>
            {/* <li>{props.book.volumeInfo.subtitle}</li> */}
            <li>{props.book.volumeInfo.authors.map((author)=>author)}</li>
            <li>{props.book.volumeInfo.publisher}</li>
        </div>
    )
}