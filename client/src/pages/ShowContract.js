import React,{useState,useEffect} from 'react'
import Axios from 'axios'
import {useNavigate, Link} from 'react-router-dom'
import '../App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ShowSepcCust from './ShowSpecCust';

function ShowItem() {

const [postList,setPostList] = useState([]);
const navigate = useNavigate();

const handleCustomerClick = (customerId) => {
    //setCustomerId(customerId);
    console.log("here!!!"+customerId);
    navigate(`/getcustomerinfo/${customerId}`);
  }

const checkCoveredItem = (contract_id) => {
    //setCustomerId(customerId);
    console.log("here!!!"+contract_id);
    navigate(`/getcontractitems/${contract_id}`);
}


useEffect(()=>{
Axios.get("http://localhost:3001/api/getcontract").then((data)=>{
    console.log(data)
    setPostList(data.data)
});
},[])

    return (
        <div className="MainPage">
            <Link to="/createcontract">
                <div className="createButtonContainer">
                    <button className="createButton">Create Contract</button>
                </div>
            </Link>
          <div className="PostContainer">
          {postList.map((val,key)=>{
                  return (
            <div className="Post" >
                <h1 className="post-title">Contract ID:{val.contract_id}</h1>
                  <p>Customer ID: {val.customer_id}</p>
                  <h4>from:{val.start_date}</h4>
                  <h4>to: {val.end_date}</h4>
                  <button onClick={() => handleCustomerClick(val.customer_id)}>Go to Customer Page</button>
                  <button onClick={() => checkCoveredItem(val.contract_id)}>Check Covered Items</button>
                  {/* <Link to={'/api/showspecificcustomer/${customerId}'}><button>Get owner info</button></Link> */}
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
