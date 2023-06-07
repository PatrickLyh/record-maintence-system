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

function CreateItem() {
  const [cust, setCust] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");
  const [postList,setPostList] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cust || !make || !model ||!year) {
      setError("Please fill out all fields");
    } else if (!isValidCust(cust)) {
      console.log("cust id is not valid!");
      setError("Please enter a valid customer ID");
    } else {
      console.log("valid customer id, valid input! OK!");
        try {
            const response = await axios.post("http://localhost:3001/api/createitem", {
              cust,
              make,
              model,
              year,
            });
            console.log(response.data);
            // Reset form
            setCust("");
            setMake("");
            setModel("");
            setYear("");
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
        <div className="container">
            <div className="input-group">
                <label className="label">Customer ID:</label>
                <input type="number"
                    id="cust"
                    value={cust}
                    onChange={(e) => setCust(e.target.value)}
                />
            </div>
            <div className="input-group">
                <label className="label">Make:</label>
                <input
                    type="text"
                    id="make"
                    value={make}
                    onChange={(e) => setMake(e.target.value)}
                />
            </div>
            <div className="input-group">
                <label className="label">Model:</label>
                <input
                    type="text"
                    id="model"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                />
            </div>
            <div className="input-group">
                <label className="label">Year:</label>
                <input type="number"
                    id="year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                />
            </div>
            {error && <p>{error}</p>}
            <button className="button" onClick={handleSubmit}>Create</button>
            
        </div>

        
        
      
    </div>
  );
}

export default CreateItem;
