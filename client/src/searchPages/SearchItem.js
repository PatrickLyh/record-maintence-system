import React,{useState,useEffect} from 'react'
import Axios from 'axios'
import {useNavigate} from 'react-router-dom'
import '/Users/liyuhang/Desktop/2023winter/coen280/project/react-node-app/client/src/Styling/search.css'

function SearchItem() {

    const [searchBy, setSearchBy] = useState('item_id');
    const [searchTerm, setSearchTerm] = useState('');

    
    
    const navigate = useNavigate();
    

      const handleSearch = () => {
        console.log("searchBy is:"+searchBy);
        switch (searchBy) {
          case 'item_id':
            searchById(searchTerm);
            break;
          case 'customer_id':
            searchByCust(searchTerm);
            break;
          default:
            console.error(`Invalid searchBy value: ${searchBy}`);
        }
      };

      const searchById = (item_id) => {
        console.log(`Searching by ID: ${item_id}`);
        navigate(`/searchitembyid/${item_id}`);
      };
    
      const searchByCust = (customer_id) => {
        console.log(`Searching by item id: ${customer_id}`);
        navigate(`/searchitembycust/${customer_id}`);
      };

      return (
        <div className="container">
            <div className="select">
                <label>Select search method:</label>
                <select value={searchBy} onChange={(event) => setSearchBy(event.target.value)}>
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

export default SearchItem
