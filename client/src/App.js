// client/src/App.js

import React from "react";
import "./App.css";
import {BrowserRouter, Routes, Route, useLocation} from "react-router-dom";
import ShowItem from './pages/ShowItem';
import ShowCustomer from './pages/ShowCustomer';
import Home from "./pages/Home";
import ShowSepcCust from "./pages/ShowSpecCust";
import ShowContract from "./pages/ShowContract";
import ShowContractItems from "./pages/ShowContractItems";
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import ShowSepcContract from "./pages/ShowSpecContract";
import SearchCustomer from "./pages/SearchCustomer";
import SearchContract from "./searchPages/SearchContract";
import SearchCustByName from "./searchPages/SearchCustByName";
import SearchCustByPhone from "./searchPages/SearchCustByPhone";
import SearchContractByID from "./searchPages/SearchContractByID";
import SearchContractByCust from "./searchPages/SearchContractByCust";
import SearchItem from "./searchPages/SearchItem";
import SearchItemByCust from "./searchPages/SearchItemByCust";
import SearchItemByID from "./searchPages/SearchItemByID";
import CreateCustomer from "./create/CreateCustomer";
import DeleteCustomer from "./pages/DeleteCustomer";
import CreateItem from "./create/CreateItem";
import Deleteitem from "./pages/DeleteItem";
import CreateContract from "./create/CreateContract";


function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <button onClick={() => goBackHome()}>Home</button> */}

        {/* <Link to="/">
          Home
        </Link> */}
      </header>
      

      <div className="navbar">
        <div className="center-link">
          <a href="/customersearch">Search Customer</a>
          <a href="/contractsearch">Search Contract</a>
          <a href="/itemsearch">Search Item</a>
        </div>

        <div className="links"> 
        <a href="/showcustomer">All Customers</a>
        <a href="/showitem">All Items</a>
        <a href="/showcontract">All Contracts</a>
        <a href="/">Home</a>
        </div>
      </div>

        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/customersearch" Component={SearchCustomer}/>
          <Route path="/contractsearch" Component={SearchContract}/>
          <Route path="/itemsearch" Component={SearchItem} />
          <Route path="/showcustomer" Component={ShowCustomer} />
          <Route path="/showitem" Component={ShowItem} />
          <Route path="/getcustomerinfo/:customerId" Component={ShowSepcCust} />
          <Route path="/getcontractitems/:contract_id" Component={ShowContractItems} />
          <Route path="/showcontract" Component={ShowContract} />
          <Route path="/getitemcontract/:item_id" Component={ShowSepcContract} />
          <Route path="/searchcustbyname/:name" Component={SearchCustByName} />
          <Route path="/searchcustbyphone/:phone" Component={SearchCustByPhone} />
          <Route path="/searchcontractbycust/:customer_id" Component={SearchContractByCust} />
          <Route path="/searchcontractbyid/:contract_id" Component={SearchContractByID} />
          <Route path="/searchitembycust/:customer_id" Component={SearchItemByCust} />
          <Route path="/searchitembyid/:item_id" Component={SearchItemByID} />
          <Route path="/createcustomer" Component={CreateCustomer} />
          <Route path="/createitem" Component={CreateItem} />
          <Route path="/createcontract" Component={CreateContract} />
          <Route path="/deletecustomer/:customer_id" Component={DeleteCustomer} />
          <Route path="/deleteitem/:item_id" Component={Deleteitem} />
        </Routes>
      </BrowserRouter>
      

    </div>
  );
}

export default App;