import React,{useState,useEffect} from 'react'
import Axios from 'axios'
import {useNavigate} from 'react-router-dom'
import '../App.css'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


function SearchCustByPhone(props) {

console.log("SearchCustByPhone called!");
let { phone } = useParams();
// const customerId = props.match.params;

console.log(phone);
const [postList,setPostList] = useState([]);

// let history = useHistory();
const navigate = useNavigate();


useEffect(()=>{
    Axios.get(`http://localhost:3001/api/searchcustbyphone/${phone}`).then((data)=>{
        console.log("requested to customer");
        console.log(data)
    setPostList(data.data);
     });
    },[phone]);


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
                  <div className="Post">
                    <h1 className="post-title">{val.name}</h1>
                    <p>Address: {val.address}</p>
                    <h4>Customer ID:{val.customer_id}</h4>
                    <h5>PhoneNumber: {val.phoneNo}</h5>
                    <button>Contact him/her!</button>
                    <button onClick={() => navigate(`/searchitembycust/${val.customer_id}`)}>check his/her item</button>
                    <button onClick={() => navigate(`/searchcontractbycust/${val.customer_id}`)}>check his/her contract</button>
                    <button onClick={() => navigate(`/deletecustomer/${val.customer_id}`)}>Delete This Customer</button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      );
      
}

export default SearchCustByPhone
