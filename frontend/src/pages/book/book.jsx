import axios from "axios";
import "./book.css";
import { Button, Row, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useQuery from "../../hooks/useQuery";
import BookDetail from "../../components/bookDetail";
import AddBook from "../../components/addBook";
import axiosInstance from "../../utils/axiosInstance";

const Book = () => {
  const [books, setBooks] = useState([]);
  const [valueSearch, setValueSearch] = useState([]);
  const [stateEdit, setStateEdit] = useState(false);

  useEffect(() => {
    axiosInstance
      .get("/allbooks")
      .then((res) => setBooks([...res.data.books]))
      .catch((e) => console.log(e));
  }, []);

  const navigate = useNavigate();

  const handleInputSearch = (event) => {
    setValueSearch(event.target.value);
    navigate(`?name_book=${event.target.value}`);
  };

  const handleClickSearch = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/api/searchbooks", {
        name_book: valueSearch,
      })
      .then((res) => setBooks(res.data))
      .catch((e) => console.log(e));
  };

  const handleAddBook = (book) => {
    const { name_book, category, author, published_date, vote } = book;
    axios
      .post("http://localhost:5000/api/book", {
        name_book,
        category,
        author,
        published_date,
        vote,
      })
      .then((res) => setBooks([...books, res.data]))
      .catch((e) => console.log(e));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/book/${id}`)
      .then((res) => {
        setBooks(books.filter((value, index) => value._id !== res.data._id));
      })
      .catch((e) => console.log(e));
  };

  const handleLogoutClick = (event) => {};

  const handleEditItem = (id, stateEdit) => {};
  const handleEditForm = (id, stateEdit) => {};

  return (
    <Container className="book_container">
      <Row>
        <div className="clearfix ">
          <div className="form-inline pull-left">
            <button className="btn btn-success m-3">
              <span className="glyphicon glyphicon-plus">Add more user </span>
            </button>
            <Button
              className="btn btn-success m-3"
              onClick={(event) => handleLogoutClick(event)}
            >
              <span className="glyphicon glyphicon-plus">Log out</span>
            </Button>
          </div>
          <div className="form-inline pull-right">
            Search by name:
            <div className="form-group d-flex">
              <input
                className="form-control"
                type="text"
                name="searchvalue"
                onChange={(event) => handleInputSearch(event)}
                placeholder="Type name to search"
              />
              <Button onClick={(event) => handleClickSearch(event)}>
                Search{" "}
              </Button>
            </div>
          </div>
        </div>
        <table className="table table-striped ">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Author</th>
              <th>Published</th>
              <th>Vote</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody className="text-center">
            {books?.length !== 0 &&
              books?.map((value, index) => (
                <BookDetail
                  handleDelete={handleDelete}
                  value={value}
                  key={index}
                  handleEditItemP={handleEditItem}
                />
              ))}
          </tbody>
        </table>
      </Row>
      <Row>
        <AddBook
          handleEditForm={handleEditForm}
          handleAddBook={handleAddBook}
        />
      </Row>
    </Container>
  );
};
export default Book;
