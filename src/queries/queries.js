import { gql } from "apollo-boost";

const getAuthorsQuery = gql`
{
    authors{
        name,
        id
    }
}
`
const getBooksQuery = gql`
    {
        books{
            name,
            id
        }
    }
`
const getBookQuery = gql`
    query getBookQuery($id:ID){ 
        book(id:$id){
            id,
            name
            genre,
            author{
                id,
                name,
                age,
                books{
                    id,
                    name,
                    genre
                }
            }
        }
    }
`

const addBookMutation = gql`
    mutation addBookMutation($name:String!,$genre:String!,$authorId:ID!){
        addBook(name:$name,genre:$genre,authorId:$authorId){
            name,
            genre
        }
    }
`

export { getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery };