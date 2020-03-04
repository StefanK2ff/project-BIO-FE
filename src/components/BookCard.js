import React from 'react'
import { Link } from 'react-router-dom';
import addBookToCollection from "./../lib/collections-services"

export default function BookCard(props) {
    const addToLib = e => {
        console.log(e.target.id)
        //addBookToCollection() //owner, items, name
        
    }
    return (
        <div key={props.book.id}>
            <img src={props.book.volumeInfo.imageLinks.smallThumbnail} alt={props.book.volumeInfo.title}/>
            <li>{props.book.volumeInfo.title}</li>
            {/* <li>{props.book.volumeInfo.subtitle}</li> */}
            {props.book.volumeInfo.authors
            ?<li>{props.book.volumeInfo.authors.map((author)=>author)}</li>
            :null}
            
            <li>{props.book.volumeInfo.publisher}</li>
            <input onClick={addToLib} type="button" value="Add to library" id={props.book.id}/>

            <Link to={`/books/${props.book.id}`}>See book in detail >></Link>
        </div>
    )
}