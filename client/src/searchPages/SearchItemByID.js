import React,{useState,useEffect} from 'react'
import Axios from 'axios'
import {useNavigate} from 'react-router-dom'
import '../App.css'
import { useParams } from 'react-router-dom';


function SearchItemByID(props) {
let { item_id } = useParams();
console.log("SearchItemByID called! item id is:"+item_id);
const [postList,setPostList] = useState([]);
const navigate = useNavigate();

const handleCustomerClick = (item_id) => {
  //setCustomerId(customerId);
  console.log("here!!!"+item_id);
  navigate(`/getcustomerinfo/${item_id}`);
}
const handleContractClick = (item_id) => {
  //setCustomerId(customerId);
  console.log("here!!!"+item_id);
  navigate(`/getcontractitems/${item_id}`);
}

useEffect(()=>{
    console.log("now i am ready to get data! item_id is:"+item_id);
    Axios.get(`http://localhost:3001/api/searchitembyid/${item_id}`).then((data)=>{
        console.log("requested to customer");
        console.log(data)
    setPostList(data.data);
     });
    },[item_id]);


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
                  <button onClick={() => handleCustomerClick(val.customer_id)}>Go to Customer Page</button>
                  <button onClick={() => handleContractClick(val.item_id)}>Check Contract Details</button>
              </div>
                );
              })
            )}
          </div>
        </div>
      );
      
}

export default SearchItemByID
