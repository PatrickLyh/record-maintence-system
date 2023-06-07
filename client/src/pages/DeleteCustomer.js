import React,{useState,useEffect} from 'react'
import Axios from 'axios'
import {useNavigate} from 'react-router-dom'
import '../App.css'
import { useParams } from 'react-router-dom';


function DeleteCustomer(props) {

let { customer_id } = useParams();
// const customerId = props.match.params;
// let history = useHistory();
const navigate = useNavigate();


useEffect(()=>{
  Axios.delete(`http://localhost:3001/api/deletecustomer/${customer_id}`)
    .then(response => {
      console.log(`Deleted ${response.data} customer(s)`);
      // Update the UI to reflect the deletion
    })
    .catch(error => {
      console.error('Error deleting customer:', error);
      // Display an error message to the user
    })});

    return (
        <div className="MainPage">
          <div className='notification'>
            Customer Deleted!
          </div>
        </div>
      ); 

}

export default DeleteCustomer
