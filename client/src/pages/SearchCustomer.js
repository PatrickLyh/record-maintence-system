import React,{useState,useEffect} from 'react'
import Axios from 'axios'
import {useNavigate} from 'react-router-dom'
import '/Users/liyuhang/Desktop/2023winter/coen280/project/react-node-app/client/src/Styling/search.css'

function SearchCustomer() {

    const [searchBy, setSearchBy] = useState('id');
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchByChange = (event) => {
        setSearchBy(event.target.value);
      };
    
    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
      };
    
    const navigate = useNavigate();
    // const handleSearch = (customerId) => {
    //     navigate(`/getcustomerinfo/${customerId}`);
    //     // Perform search using searchBy and searchTerm values
    //   };

      const handleSearch = () => {
        switch (searchBy) {
          case 'id':
            searchById(searchTerm);
            break;
          case 'name':
            searchByName(searchTerm);
            break;
          case 'phone':
            searchByPhone(searchTerm);
            break;
          default:
            console.error(`Invalid searchBy value: ${searchBy}`);
        }
      };

      const searchById = (id) => {
        // Code to search by ID goes here
        console.log(`Searching by ID: ${id}`);
        navigate(`/getcustomerinfo/${id}`);
      };
    
      const searchByName = (name) => {
        // Code to search by name goes here
        console.log(`Searching by name: ${name}`);
        navigate(`/searchcustbyname/${name}`);
      };
    
      const searchByPhone = (phone) => {
        // Code to search by phone goes here
        console.log(`Searching by phone: ${phone}`);
        navigate(`/searchcustbyphone/${phone}`);
      };
    
      

      return (
        <div className="container">
            <div className="select">
                <label>Select search method:</label>
                <select value={searchBy} onChange={(event) => setSearchBy(event.target.value)}>
                    <option value="id">Customer ID</option>
                    <option value="phone">Phone Number</option>
                    <option value="name">Name</option>
                </select>
            </div>
            <div className="input-group">
                <label className="label">Enter  search  term:</label>
                <input type="text" value={searchTerm} className="input" placeholder="Search item" onChange={(event)=>setSearchTerm(event.target.value)}/>
            </div>
            {/* <div className="label">searchBy is: {searchBy}</div>
            <div className="label">searchTerm is: {searchTerm}</div> */}
            <button className="button" onClick={handleSearch}>Search</button>
        </div>

      );
}

export default SearchCustomer
