// Search.jsx

import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { FaSearch } from "react-icons/fa";

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div>
      <Container>
        <Row className='p-4'>
          <form className="container-fluid" onSubmit={handleSearch}>
            <div className="input-group">
              <span
                className="input-group-text"
                id="basic-addon1"
                style={{ cursor: "pointer" }}
              >
                <FaSearch />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                aria-label="Search"
                aria-describedby="basic-addon1"
                value={searchTerm}
                onChange={handleChange}
              />
            </div>
          </form>
        </Row>
      </Container>
    </div>
  );
};

export default Search;
