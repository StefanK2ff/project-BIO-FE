import BookLineUnderCol from "./BookLineUnderCol"
import React from 'react'

export default function BookListUnderCol(props) {
    return (
        <div>
    <ul>
        {props.items.map(book => {
            return (<li><BookLineUnderCol bookid={book}/> </li>)
        })}
        </ul>
    </div>
    )
}
