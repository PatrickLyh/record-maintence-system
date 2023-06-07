import React, { useState } from "react";
import axios from "axios";
import Axios from "axios";
import {useNavigate} from 'react-router-dom'

// CREATE TABLE Service_Item (
//   item_id INT PRIMARY KEY,
//   customer_id INT,
//   make VARCHAR(40),
//   model VARCHAR(40),
//   year INT,
//   wether_peripheral INT,
//   FOREIGN KEY (customer_id) REFERENCES Customer(customer_id)
// );

function CreateContract() {
  const [cust, setCust] = useState("");
  const [item, setItem] = useState("");
  const [startdate, setStartdate] = useState("");
  const [month, setMonth] = useState("");
  const [error, setError] = useState("");
  const [postList,setPostList] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cust || !item || !startdate ||!month) {
      setError("Please fill out all fields");
    } else if (!isValidCust(cust)) {
      console.log("cust id is not valid!");
      setError("Please enter a valid customer ID");
    } else {
      console.log("valid customer id, valid input! OK!");
        try {
            const response = await axios.post("http://localhost:3001/api/createitem", {
              cust,
              item,
              startdate,
              month,
            });
            console.log(response.data);
            // Reset form
            setCust("");
            setItem("");
            setStartdate("");
            setMonth("");
            const customerId = response.data.id;
            navigate(`/showitem`);
          } catch (error) {
            console.error(error);
          }
    }
  };

  const isValidCust = (cust) => {
    Axios.get(`http://localhost:3001/api/getspecificcustomer/${cust}`).then((data)=>{
        console.log("requested to customer");
        console.log(data)
    setPostList(data.data);
     });
     if(postList.length==0){
      return false;
     }else{
      return true;
     }
  };

  return (
    <div>
      <h2>Create a new service item</h2>
      <h3>Notice: please make sure you are input currently existing item. </h3>
      <h3>If not, please go to create item first!</h3>
        <div className="container">
            <div className="input-group">
                <label className="label">Item ID:</label>
                <input
                    type="number"
                    id="item"
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                />
            </div>
            <div className="input-group">
                <label className="label">Start Date:</label>
                <input
                    type="text"
                    id="startdate"
                    value={startdate}
                    onChange={(e) => setStartdate(e.target.value)}
                />
            </div>
            <div className="input-group">
                <label className="label">Coverage Month(s):</label>
                <input type="number"
                    id="month"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                />
            </div>
            {error && <p>{error}</p>}
            <button className="button" onClick={handleSubmit}>Create</button>
            
        </div>

        
        
      
    </div>
  );
}

export default CreateContract;
