import React from "react";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const AddBook = (props) => {
  let { handleAddBook, handleEditForm } = props;

  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);

  const [book, setBook] = useState({});

  useEffect(() => {
    axiosInstance
      .get("/authors")
      .then((res) => setAuthors(res.data))
      .catch((e) => console.log(e));

    axiosInstance
      .get("/categories")
      .then((res) => setCategories(res.data))
      .catch((e) => console.log(e));
  }, []);

  const handleNameChange = (event) => {
    setBook({
      ...book,
      name_book: event.target.value,
    });
  };

  const handleCategoryChange = (event) => {
    let category = event.target.value;
    if (category === "0") {
      category = "";
    }
    setBook({
      ...book,
      category: category,
    });
  };

  const handleAthorChange = (event) => {
    let author = event.target.value;
    if (author === "0") {
      author = "";
    }
    setBook({
      ...book,
      author: author,
    });
  };

  const handlePublishedChange = (event) => {
    setBook({
      ...book,
      published_date: event.target.value,
    });
  };

  const handleVoteChange = (event) => {
    setBook({
      ...book,
      vote: event.target.value,
    });
  };

  const handleEvent = (event) => {
    event.preventDefault();
    handleAddBook(book);
  };

  return (
    <div className="crude-form__wrapper" ng-show="triggerForm">
      <h3 ng-show="editForm">Edit user</h3>

      <h3 ng-show="addForm">Add user</h3>

      <form name="userForm" ng-model="userForm">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            className="form-control"
            type="text"
            name="name_book"
            onChange={(event) => handleNameChange(event)}
            required="required"
          />
          <input
            className="form-control"
            type="file"
            name="name_book"
            onChange={(event) => handleNameChange(event)}
            required="required"
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="categories"
            name="category"
            className="form-control"
            onChange={(event) => handleCategoryChange(event)}
          >
            <option value="0">List Categories</option>
            {categories.map((value, index) => (
              <option key={index} value={value.category}>
                {value.category}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <select
            id="authors"
            name="author"
            className="form-control"
            onChange={(event) => handleAthorChange(event)}
          >
            <option value="0">List Authors</option>
            {authors.map((value, index) => (
              <option key={index} value={value.author}>
                {value.author}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="published date">Published</label>
          <input
            className="form-control"
            type="datetime-local"
            name="published_date"
            onChange={(event) => handlePublishedChange(event)}
            min="1900-06-07T00:00"
            required="required"
          />
        </div>

        <div className="form-group">
          <label htmlFor="vote">Vote</label>
          <input
            className="form-control"
            type="number"
            name="vote"
            onChange={(event) => handleVoteChange(event)}
            min="1"
            required="required"
          />
        </div>

        <button
          onClick={(event) => handleEvent(event)}
          className="btn btn-primary"
        >
          Save change
        </button>
        <button className="btn btn-primary">Cancel </button>
      </form>
    </div>
  );
};

export default AddBook;
