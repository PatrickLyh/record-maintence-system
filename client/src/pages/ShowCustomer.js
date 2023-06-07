import React,{useState,useEffect} from 'react'
import Axios from 'axios'
import {useNavigate} from 'react-router-dom'
import '../App.css'
import { Link } from 'react-router-dom';

function ShowCustomer() {

const [postList,setPostList] = useState([]);

// let history = useHistory();
const history = useNavigate();

const navigate = useNavigate();

const handleDeleteClick = (customerId) =>{
    navigate(`/deletecustomer/${customerId}`);
}
  

useEffect(()=>{
Axios.get("http://localhost:3001/api/getcustomer").then((data)=>{
    console.log(data)
    setPostList(data.data)
});
},[])

    return (
        <div className="MainPage">
            {/* <Link to="/createcustomer">
                  <button className="createButton">Create Customer</button>
            </Link>
            <Link to="/createcustomer">
                  <button className="createButton">Create Contract</button>
            </Link> */}
            <Link to="/createcustomer">
                <div className="createButtonContainer">
                    <button className="createButton">Create Customer</button>
                </div>
            </Link>
      
          <div className="PostContainer">
          {postList.map((val,key)=>{
                  return (
            <div className="Post" >
                <h1 className="post-title">{val.name}</h1>
                  <p>Address: {val.address}</p>
                  <h4>Customer ID:{val.customer_id}</h4>
                  <h5>PhoneNumber: {val.phoneNo}</h5>
                  <button>Contact him/her!</button>
                  <button onClick={() => navigate(`/searchitembycust/${val.customer_id}`)}>check his/her item</button>
                  <button onClick={() => navigate(`/searchcontractbycust/${val.customer_id}`)}>check his/her contract</button>
                  <button onClick={() => handleDeleteClick(val.customer_id)}>Delete This Customer</button>
              </div>
                  )
              })}
          </div>
        </div>
    )
}

export default ShowCustomer
