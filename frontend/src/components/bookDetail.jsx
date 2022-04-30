import React from "react";
import { useState } from "react";

const BookDetail = (props) => {
  const { value, handleDelete, handleEditItemP } = props;

  const [stateEdit, setStateEdit] = useState(false);

  const handleDeleteItem = () => {
    handleDelete(value._id.toString());
  };

  const handleEditItem = () => {
    if (stateEdit) {
      setStateEdit(false);
    } else {
      setStateEdit(true);
    }
    handleEditItemP(value._id.toString(), stateEdit);
  };
  return (
    <tr>
      <td>{value.name_book} </td>
      <td>{value.category} </td>
      <td>{value.author} </td>
      <td>{value.published_date}</td>
      <td>{value.vote}</td>
      <td>
        <button className="btn btn-primary" onClick={handleEditItem}>
          Edit
        </button>
      </td>
      <td>
        <button className="btn btn-danger" onClick={handleDeleteItem}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default BookDetail;
