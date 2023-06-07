import React,{useState,useEffect} from 'react'
import Axios from 'axios'
import {useNavigate} from 'react-router-dom'
import '/Users/liyuhang/Desktop/2023winter/coen280/project/react-node-app/client/src/Styling/search.css'

function SearchContract() {

    const [searchBy, setSearchBy] = useState('contract_id');
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchByChange = (event) => {
        setSearchBy(event.target.value);
      };
    
    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
      };
    
    const navigate = useNavigate();
    

      const handleSearch = () => {
        switch (searchBy) {
          case 'contract_id':
            searchById(searchTerm);
            break;
          case 'item_id':
            searchByItem(searchTerm);
            break;
          case 'customer_id':
            searchByCustomer(searchTerm);
            break;
          default:
            console.error(`Invalid searchBy value: ${searchBy}`);
        }
      };

      const searchById = (contract_id) => {
        console.log(`Searching by ID: ${contract_id}`);
        navigate(`/searchcontractbyid/${contract_id}`);
      };
    
      const searchByItem = (item_id) => {
        console.log(`Searching by item id: ${item_id}`);
        navigate(`/getitemcontract/${item_id}`);
      };
    
      const searchByCustomer = (customer_id) => {
        console.log(`Searching by customer id: ${customer_id}`);
        navigate(`/searchcontractbycust/${customer_id}`);
      };
    
      

      return (
        <div className="container">
            <div className="select">
                <label>Select search method:</label>
                <select value={searchBy} onChange={(event) => setSearchBy(event.target.value)}>
                    <option value="contract_id">Contract ID</option>
                    <option value="item_id">Item ID</option>
                    <option value="customer_id">Customer ID</option>
                </select>
            </div>
            <div className="input-group">
                <label className="label">Enter  search  term      :</label>
                <input type="text" value={searchTerm} className="input" placeholder="Search item" onChange={(event)=>setSearchTerm(event.target.value)}/>
            </div>
            {/* <div className="label">searchBy is: {searchBy}</div>
            <div className="label">searchTerm is: {searchTerm}</div> */}
            <button className="button" onClick={handleSearch}>Search</button>
        </div>

      );
}

export default SearchContract
