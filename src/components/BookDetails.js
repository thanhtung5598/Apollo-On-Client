import React from "react";
import { graphql } from "react-apollo";
import { getBookQuery } from "./../queries/queries";

function BookDetails(props) {
    let displayBookDetail = (props) => {
        const { book } = props.data
        if (book) {
            return (
                    <div className="book-details">
                       <hr/>
                        <h2>{book.name}</h2>
                        <p>{book.genre}</p>
                        <p>{book.author.name}</p>
                        <p>All books by this author:</p>
                        <ul className="other-books">
                            {book.author.books.map(item => {
                                return <li key={item.id}>{item.name}</li>
                            })}
                        </ul>
                        <hr/>
                    </div>
            );
        } else {
            return (
                <div>
                    <hr />
                    No book selected...
                    <hr />
                </div>
            )
        }
    }
    return (
        <div id="book-details">
            <h1>This is detail of the book</h1>
            {displayBookDetail(props)}
        </div>
    )
}

export default graphql(getBookQuery, { // getBookQuery and the second parameter is an option 
    options: (props) => { // option received props as parameter and return variables
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetails);