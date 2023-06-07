import React,{useState,useEffect} from 'react'
import Axios from 'axios'
import {useNavigate} from 'react-router-dom'
import '../App.css'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


function SearchItemByCust(props) {

console.log("SearchItemByCust called!");
let { customer_id } = useParams();
// const customerId = props.match.params;

console.log(customer_id);
const [postList,setPostList] = useState([]);

// let history = useHistory();
const navigate = useNavigate();


const handleCustomerClick = (customerId) => {
  //setCustomerId(customerId);
  console.log("here!!!"+customerId);
  navigate(`/getcustomerinfo/${customerId}`);
}

const handleContractClick = (contract_id) => {
  //setCustomerId(customerId);
  console.log("here!!!"+contract_id);
  navigate(`/getcontractitems/${contract_id}`);
}



useEffect(()=>{
    Axios.get(`http://localhost:3001/api/searchitembycust/${customer_id}`).then((data)=>{
        console.log("requested to customer");
        console.log(data)
    setPostList(data.data);
     });
    },[customer_id]);


    return (
        <div className="MainPage">
          {postList.length > 0 && (
            <div className="Notification">
              <div className="post">
                Here are the detailed info of selected item's owner:
              </div>
            </div>
          )}
          <div className="PostContainer">
            {postList.length === 0 ? (
              <div className="no-results">No results found. Please check the info you have input.</div>
            ) : (
              postList.map((val, key) => {
                return (
                  <div className="Post" >
                  <h1 className="post-title">{val.item_id}</h1>
                  <p>Make: {val.make}</p>
                  <h4>Model:{val.model}</h4>
                  <h5>Year: {val.year}</h5>
                  {/* <h4>Service Type: {val.service_type = 2 ? "Software" : val.service_type = 1 ? "Hardware" : "Peripheral"}</h4> */}
                  <button onClick={() => handleCustomerClick(val.customer_id)}>Go to Customer Page</button>
                  <button onClick={() => handleContractClick(val.item_id)}>Check Contract Details</button>
                  {/* <Link to={'/api/showspecificcustomer/${customerId}'}><button>Get owner info</button></Link> */}
              </div>
                );
              })
            )}
          </div>
        </div>
      );
      
}

export default SearchItemByCust
