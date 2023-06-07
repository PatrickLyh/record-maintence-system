import React,{useState,useEffect} from 'react'
import Axios from 'axios'
import {useNavigate} from 'react-router-dom'
import '../App.css'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


function ShowContractItems(props) {

let { contract_id } = useParams();
// const customerId = props.match.params;

console.log(contract_id);
const [postList,setPostList] = useState([]);

// let history = useHistory();
const navigate = useNavigate();

const goToCustomer = (customerId) => {
    //setCustomerId(customerId);
    console.log("here!!!"+customerId);
    navigate(`/getcustomerinfo/${customerId}`);
  }


useEffect(()=>{
    Axios.get(`http://localhost:3001/api/getcontractitems/${contract_id}`).then((data)=>{
        console.log("requested to customer");
        console.log(data)
    setPostList(data.data);
     });
    },[contract_id]);


    return (
        <div className="MainPage">
            <div className="Notification">
                <div className="post">Here is the list of item(s)</div>
                <button onClick={() => goToCustomer(postList[0].customer_id)}>Go to Customer Page</button>
            </div>

            <div className="PostContainer">
                {postList.map((val,key)=>{
                    return (
                        <div className="Post" >
                            <h1 className="post-title">{val.item_id}</h1>
                            <p>Make: {val.make}</p>
                            <h4>Model:{val.model}</h4>
                            <h5>Year: {val.year}</h5>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default ShowContractItems
