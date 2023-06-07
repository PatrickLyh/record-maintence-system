import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

function CreateCustomer() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone || !address) {
      setError("Please fill out all fields");
    } else if (!isValidPhoneNumber(phone)) {
      setError("Please enter a valid phone number");
    } else {
        try {
            const response = await axios.post("http://localhost:3001/api/createcustomer", {
              name,
              phone,
              address,
            });
            console.log(response.data);
            // Reset form
            setName("");
            setPhone("");
            setAddress("");
            setError("");
            const customerId = response.data.id;
            navigate(`/getcustomerinfo/${customerId}`);
          } catch (error) {
            console.error(error);
          }
    }
  };

  const isValidPhoneNumber = (phoneNumber) => {
    const regex = /^\d{10}$/;
    return regex.test(phoneNumber);
  };

  return (
    <div>
      <h2>Create a new customer</h2>
        {/* <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div> */}
        <div className="container">
            <div className="input-group">
                <label className="label">Name:</label>
                <input type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="input-group">
                <label className="label">Phone number:</label>
                <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>
            <div className="input-group">
                <label className="label">Address:</label>
                <input
                    type="text"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>
            {error && <p>{error}</p>}
            <button className="button" onClick={handleSubmit}>Create</button>
            
        </div>

        
        
      
    </div>
  );
}

export default CreateCustomer;
