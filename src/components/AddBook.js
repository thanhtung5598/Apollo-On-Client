import React, { Component } from "react";
import { graphql } from "react-apollo";
import compose from "lodash.flowright";
import { getAuthorsQuery, addBookMutation,getBooksQuery } from "./../queries/queries";

class AddBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            genre: '',
            authorId: ''
        };
    }
    onChangeValue = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
    }
    onSubmitted = (event) => {
        const { name, genre, authorId } = this.state;
        event.preventDefault();
        this.props.addBookMutation({
            variables: {
                name,
                genre,
                authorId
            },
            refetchQueries:[{query:getBooksQuery}]
        }).then(()=>{
            alert("Add book successed")
        });
    }
    displayAuthors(props) {
        let data = props.getAuthorsQuery
        if (data.loading) {
            return <option>Loading...</option>
        } else {
            return data.authors.map((author) => {
                return <option key={author.id} value={author.id}>{author.name}</option>
            })
        }
    }
    render() {
        const { name, genre } = this.state;
        return (
            <form id="add-book" onSubmit={this.onSubmitted}>
                <div className="field">
                    <label>Book name:</label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={this.onChangeValue}
                    />
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input
                        type="text"
                        name="genre"
                        value={genre}
                        onChange={this.onChangeValue}
                    />
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select name="authorId" onChange={this.onChangeValue} >
                        {this.displayAuthors(this.props)}
                    </select>
                </div>
                <button>Add book</button>
            </form >
        )
    }
}

export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);