import React,{useState,useEffect} from 'react'
import Axios from 'axios'
import {useNavigate} from 'react-router-dom'
import '../App.css'
import { useParams } from 'react-router-dom';


function Deleteitem(props) {

let { item_id } = useParams();
// const customerId = props.match.params;
// let history = useHistory();
const navigate = useNavigate();


useEffect(()=>{
  Axios.delete(`http://localhost:3001/api/deleteitem/${item_id}`)
    .then(response => {
      console.log(`Deleted ${response.data} item(s)`);
      // Update the UI to reflect the deletion
    })
    .catch(error => {
      console.error('Error deleting item:', error);
      // Display an error message to the user
    })});

    return (
        <div className="MainPage">
          <div className='notification'>
            Item Deleted!
          </div>
        </div>
      ); 

}

export default Deleteitem
