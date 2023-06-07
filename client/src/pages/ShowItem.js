import React,{useState,useEffect} from 'react'
import Axios from 'axios'
import {useNavigate, Link} from 'react-router-dom'
import '../App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ShowSepcCust from './ShowSpecCust';

function ShowItem() {

const [postList,setPostList] = useState([]);
//const [customerId,setCustomerId] = useState([]);

// let history = useHistory();
const navigate = useNavigate();

const handleCustomerClick = (customerId) => {
    //setCustomerId(customerId);
    console.log("here!!!"+customerId);
    navigate(`/getcustomerinfo/${customerId}`);
  }

const handleContractClick = (item_id) => {
    //setCustomerId(customerId);
    console.log("here!!!"+item_id);
    navigate(`/getitemcontract/${item_id}`);
  }


useEffect(()=>{
Axios.get("http://localhost:3001/api/getitem").then((data)=>{
    console.log(data)
    setPostList(data.data)
});
},[])

    return (
        <div className="MainPage">
            <Link to="/createitem">
                <div className="createButtonContainer">
                    <button className="createButton">Create Item</button>
                </div>
            </Link>
          <div className="PostContainer">
          {postList.map((val,key)=>{
                  return (
            <div className="Post" >
                <h1 className="post-title">{val.item_id}</h1>
                  <p>Make: {val.make}</p>
                  <h4>Model:{val.model}</h4>
                  <h5>Year: {val.year}</h5>
                  <button onClick={() => handleCustomerClick(val.customer_id)}>Go to Customer Page</button>
                  <button onClick={() => handleContractClick(val.item_id)}>Check Contract Details</button>
                  <button onClick={() => navigate(`/deleteitem/${val.item_id}`)}>Delete This item</button>
              </div>
                  )
              })}
          </div>

          
            {/* <Routes>
                <Route path="/getcustomerinfo/:customerId" children={ShowSepcCust} />
            </Routes> */}
        
        </div>
    )
}

export default ShowItem
