import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';
import Pagination from './Pagination';


const UserData = () => {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [filterText, setFilterText] = useState('');
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const usersPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/data');
        setUserData(response.data);
      } catch (error) {
        setError('Error fetching data');
      }
    };

    fetchData();
  }, []);

  const handleViewDetails = (id) => {
    setUserData(prevData => {
      return prevData.map(user => {
        if (user.id === id) {
          return { ...user, showDetails: !user.showDetails };
        }
        return user;
      });
    });
  };

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const handleSortChange = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredUsers = userData.filter(user => {
    return user.name.toLowerCase().includes(filterText.toLowerCase()) ||
           user.email.toLowerCase().includes(filterText.toLowerCase());
  });

  const sortedUsers = sortField ? [...filteredUsers].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  }) : filteredUsers;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

 


return (
    <div>
      {error && <div>{error}</div>}
      <div className="controls">
        <div className="search-input">
          <input
            type="text"
            value={filterText}
            onChange={handleFilterChange}
            placeholder="Search by name or email"
          />
        </div>
        <button className='sort-button' onClick={() => handleSortChange('name')}>
          Sort by Name {sortField === 'name' && (sortDirection === 'asc' ? '▲' : '▼')}
        </button>
        <button className='sort-button' onClick={() => handleSortChange('email')}>
          Sort by Email {sortField === 'email' && (sortDirection === 'asc' ? '▲' : '▼')}
        </button>
      </div>
 

<div className="user-cards">
  {currentUsers.map(user => (
    <div className="user-card-container" key={user.id}>
      <div className="user-card">
        <div className="category">
          <h3>Name</h3>
          <p>{user.name}</p>
        </div>
        <div className="category">
          <h3>Email</h3>
          <p>{user.email}</p>
        </div>
        <div className="category">
          <button className="view-details" onClick={() => handleViewDetails(user.id)}>
            {user.showDetails ? 'Hide Details' : 'View Details'}
          </button>
        </div>
      </div>
      {user.showDetails && (
        <div className="details">
  <p><strong>Username:</strong> {user.username}</p>
  <p><strong>Phone:</strong> {user.phone}</p>
  <p><strong>Website:</strong> {user.website}</p>
  <p><strong>Address:</strong> {user.address.street}, {user.address.suite}, {user.address.city}</p>
  <p><strong>Company:</strong> {user.company.name}</p>
</div>

      )}
    </div>
  ))}
</div>




      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(sortedUsers.length / usersPerPage)}
        onPageChange={paginate}
      />
    </div>
  );
  


  
};

export default UserData;
