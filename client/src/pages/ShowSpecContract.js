import React,{useState,useEffect} from 'react'
import Axios from 'axios'
import {useNavigate} from 'react-router-dom'
import '../App.css'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


function ShowSepcContract(props) {

console.log("ShowSepcContract called!");
let { item_id } = useParams();
// const customerId = props.match.params;

console.log(item_id);
const [postList,setPostList] = useState([]);

// let history = useHistory();
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
    Axios.get(`http://localhost:3001/api/getspecificcontract/${item_id}`).then((data)=>{
        console.log("requested to contract");
        console.log(data);
        console.log(data.data);
    setPostList(data.data);
     });
    },[item_id]);


    return (
        <div className="MainPage">
            <div className="Notification">
                <div className="post">The item with ID {item_id} is contained in this contract:</div>
            </div>

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
                    </div>
                )
              })}
          </div>


        </div>

        
    )
}

export default ShowSepcContract
