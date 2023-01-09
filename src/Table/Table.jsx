import React, { useEffect, useMemo, useState } from "react";
import "./Table.css";

const Table = ({ data, setData }) => {
  // const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState([]);
  const pageSize = 10;

  // Filters the data based on the search query
  const filteredData = data.filter((item) => {
    for (let key in item) {
      if (item[key].toString().toLowerCase().includes(search.toLowerCase())) {
        return true;
      }
    }
    return false;
  });

  // Calculates the total number of pages
  const totalPages = Math.ceil(filteredData.length / pageSize);

  // Gets the data for the current page
  const paginatedData = filteredData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  // Handles the search input change
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Handles the page change
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Handles the row selection
  const handleRowSelection = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((selectedId) => selectedId !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  // Handles the delete button click
  const handleDeleteClick = () => {
    setData(data.filter((item) => !selected.includes(item.id)));
    setSelected([]);
  };

  // Handles the row delete button click
  const handleRowDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
    setSelected([]);
  };

  // Handles the select all checkbox change
  const handleSelectAllChange = (e) => {
    if (e.target.checked) {
      setSelected(paginatedData.map((item) => item.id));
    } else {
      setSelected([]);
    }
  };

  // Handles the row edit
  const handleRowEdit = (id) => {
    // Find the index of the row to edit
    const index = data.findIndex((item) => item.id === id);

    // Create a copy of the data array
    const newData = [...data];

    // Edit the row
    newData[index] = {
      ...newData[index],
      name: "TEST",
      email: "TEST@test.COM",
      role: "admin",
    };

    // Update the state with the edited data
    setData(newData);
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <input
          type="text"
          placeholder="Search by Name, Email or Role"
          value={search}
          onChange={handleSearchChange}
        />
        <button onClick={handleDeleteClick}>🗑️</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" onChange={handleSelectAllChange} />
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr
              key={item.id}
              className={selected.includes(item.id) ? "selected" : ""}
            >
              <td>
                <input
                  type="checkbox"
                  checked={selected.includes(item.id)}
                  onChange={() => handleRowSelection(item.id)}
                />
              </td>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.role}</td>
              <td>
                <div className="btn_wrapper">
                  <button onClick={() => handleRowEdit(item.id)}>🖊️</button>
                  <button onClick={() => handleRowDelete(item.id)}>🗑️</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="table-footer">
        <button disabled={page === 1} onClick={() => handlePageChange(1)}>
          &lt;&lt;
        </button>
        <button
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          &lt;
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            disabled={page === i + 1}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={page === totalPages}
          onClick={() => handlePageChange(page + 1)}
        >
          &gt;
        </button>
        <button
          disabled={page === totalPages}
          onClick={() => handlePageChange(totalPages)}
        >
          &gt;&gt;
        </button>
      </div>
    </div>
  );
};

export default Table;
