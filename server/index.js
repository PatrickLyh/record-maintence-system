// server/index.js

const express = require("express");

const PORT = process.env.PORT || 3001;

//const PORT = 3001;

const connection = require('./server');

const cors = require('cors');

const app = express();
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json())

//delete customer:
app.delete('/api/deletecustomer/:customer_id', (req, res) => {
  const customerId = req.params.customer_id;
  const sql = 'DELETE FROM Customer WHERE customer_id = ?';
  connection.query(sql, [customerId],(error,results)=>{
    if (error) {
      console.error('Error deleting customer:', error);
      res.sendStatus(500); // Send a 'Server Error' response
    } else {
      console.log(`Deleted ${results.affectedRows} customer(s)`);
      res.sendStatus(204); // Send a 'No Content' response to indicate success
    }
    }
  );
});

//delete item:
app.delete('/api/deleteitem/:item_id', (req, res) => {
  const item_id = req.params.item_id;
  const sql = 'DELETE FROM Service_Item WHERE item_id = ?';
  connection.query(sql, [item_id],(error,results)=>{
    if (error) {
      console.error('Error deleting customer:', error);
      res.sendStatus(500); // Send a 'Server Error' response
    } else {
      console.log(`Deleted ${results.affectedRows} item(s)`);
      res.sendStatus(204); // Send a 'No Content' response to indicate success
    }
    }
  );
});


const customerExists = (customer_id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM Customer WHERE customer_id = ?",
      [customer_id],
      (error, results) => {
        if (error) {
          reject(error);
        } else if (results.length > 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    );
  });
};

app.get("/api/customers/:customer_id", (req, res) => {
  const customer_id = req.params.customer_id;
  customerExists(customer_id)
    .then((exists) => {
      if (exists) {
        res.status(200).send("Customer exists");
      } else {
        res.status(404).send("Customer does not exist");
      }
    })
    .catch((error) => {
      console.error("Error checking if customer exists:", error);
      res.status(500).send("Internal server error");
    });
});


//get max customer id:
const getMaxCustomerId = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT MAX(customer_id) AS maxId FROM Customer", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0].maxId || 0);
      }
    });
  });
};

//create new customer
app.post("/api/createcustomer", async (req, res) => {
  const { name, phone, address } = req.body;
  if (!name || !phone || !address) {
    res.status(400).send("Please provide name, phone, and address");
  } else {
    try{
    const maxCustomerId = await getMaxCustomerId(); 
    const newCustomer = {
      id: maxCustomerId + 1,
      name,
      phone,
      address,
    };
    console.log("inserted values are:"+newCustomer);
    connection.query(
      "INSERT INTO Customer VALUES (?, ?, ?, ?)",
      [newCustomer.id, newCustomer.name, newCustomer.phone, newCustomer.address],
      (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).send("An error occurred while creating the customer");
        } else {
          res.status(201).json(newCustomer);
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while retrieving the max customer ID");
  }
}
});

//get max item id:
const getMaxItemId = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT MAX(item_id) AS maxId FROM Service_Item", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0].maxId || 0);
      }
    });
  });
};

//create new item
app.post("/api/createitem", async (req, res) => {
  const { cust, make, model, year } = req.body;
  if (!cust || !make || !model || !year) {
    res.status(400).send("Please provide customer_id, make, model, year");
  } else {
    try{
    const maxItemId = await getMaxItemId(); 
    const newItem = {
      id: maxItemId + 1,
      cust,
      make,
      model,
      year,
    };
    console.log("inserted values are:"+newItem);
    connection.query(
      "INSERT INTO Service_Item VALUES (?, ?, ?, ?, ?, ?)",
      [newItem.id, newItem.cust, newItem.make, newItem.model,newItem.year,0],
      (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).send("An error occurred while creating the item");
        } else {
          res.status(201).json(newItem);
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while retrieving the max item ID");
  }
}
});


// Route to get all posts
app.get("/api/getcustomer", (req,res)=>{
  connection.query("SELECT * FROM Customer", (err,result)=>{
      if(err) {
        console.log(err)
      } 
      res.send(result)
    }
  );   
});

// Route to get all service items
app.get("/api/getitem", (req,res)=>{
  connection.query("SELECT * FROM Service_Item", (err,result)=>{
      if(err) {
        console.log(err)
      } 
      res.send(result)
    }
  );   
});

// Route to get all contracts
app.get("/api/getcontract", (req,res)=>{
  connection.query("SELECT * FROM ServiceContract", (err,result)=>{
      if(err) {
        console.log(err)
      } 
      res.send(result)
    }
  );   
});

// Route to get a specific customer's info by id
app.get('/api/getspecificcustomer/:customerId', (req,res)=>{
  const targetedcustomerId = req.params.customerId;
  console.log("recieved! targeted customer id is:"+targetedcustomerId);
  const sql = 'SELECT * FROM Customer WHERE customer_id = ?';
  connection.query(sql, [targetedcustomerId],(err,result)=>{
      if(err) {
        console.log("oops, seems to be wrong")
        console.log(err)
      } 
      res.send(result)
    }
  );   
});

// Route to get a specific customer's info by name
app.get('/api/searchcustbyname/:name', (req,res)=>{
  const name = req.params.name;
  console.log("recieved! targeted customer name is:"+name);
  const sql = 'SELECT * FROM Customer WHERE name LIKE ?';
  connection.query(sql, [`%${name}%`],(err,result)=>{
      if(err) {
        console.log("oops, seems to be wrong")
        console.log(err)
      } 
      res.send(result)
    }
  );   
});

// Route to get a specific customer's info by phone
app.get('/api/searchcustbyphone/:phone', (req,res)=>{
  const phone = req.params.phone;
  console.log("recieved! targeted customer phone is:"+phone);
  const sql = 'SELECT * FROM Customer WHERE phoneNo = ?';
  connection.query(sql, [phone],(err,result)=>{
      if(err) {
        console.log("oops, seems to be wrong")
        console.log(err)
      } 
      res.send(result)
    }
  );   
});

// Route to get a specific item's contract
app.get('/api/getspecificcontract/:item_id', (req,res)=>{
  const titem_id = req.params.item_id;
  console.log("recieved! targeted item id is:"+titem_id);
  const sql = 'SELECT DISTINCT i.item_id, c.start_date, c.end_date, c.customer_id, o.contract_id FROM ServiceContract c, Contains o, Service_Item i WHERE o.item_id = ? AND o.item_id = i.item_id AND o.contract_id=c.contract_id';
  connection.query(sql, [titem_id],(err,result)=>{
      if(err) {
        console.log("oops, seems to be wrong")
        console.log(err)
      } 
      res.send(result)
    }
  );   
});

// Route to get a specific contract according to id
app.get('/api/searchcontractbyid/:contract_id', (req,res)=>{
  const tcontract_id = req.params.contract_id;
  console.log("recieved! targeted contract id is:"+tcontract_id);
  const sql = 'SELECT DISTINCT c.start_date, c.end_date, c.customer_id, o.contract_id FROM ServiceContract c, Contains o, Service_Item i WHERE o.item_id = i.item_id AND o.contract_id=c.contract_id AND o.contract_id=?';
  connection.query(sql, [tcontract_id],(err,result)=>{
      if(err) {
        console.log("oops, seems to be wrong")
        console.log(err)
      } 
      res.send(result)
    }
  );   
});

// Route to get a specific contract according to customer_id
app.get('/api/searchcontractbycust/:coustomer_id', (req,res)=>{
  const tcustomer_id = req.params.coustomer_id;
  console.log("recieved! targeted customer id is:"+tcustomer_id);
  const sql = 'SELECT DISTINCT c.start_date, c.end_date, c.customer_id, o.contract_id FROM ServiceContract c, Contains o, Service_Item i WHERE o.item_id = i.item_id AND o.contract_id=c.contract_id AND c.customer_id=?';
  connection.query(sql, [tcustomer_id],(err,result)=>{
      if(err) {
        console.log("oops, seems to be wrong")
        console.log(err)
      } 
      res.send(result)
    }
  );   
});



// Route to get a contract's items info
app.get('/api/getcontractitems/:contract_id', (req,res)=>{
  const targetedcontractId = req.params.contract_id;
  console.log("recieved! targeted customer id is:"+targetedcontractId);
  const sql = 'SELECT DISTINCT i.item_id, i.model, i.make, i.year, c.customer_id FROM ServiceContract c, Contains o, Service_Item i WHERE o.contract_id = ? AND o.item_id = i.item_id AND o.contract_id=c.contract_id';
  connection.query(sql, [targetedcontractId],(err,result)=>{
    if(err) {
      console.log("oops, seems to be wrong")
      console.log(err)
    } 
    res.send(result)
  }
); 



// Route to get service item by customer_id
app.get('/api/searchitembycust/:customer_id', (req,res)=>{
  const tcustomer_id = req.params.customer_id;
  console.log("received! target item's customer id is:"+tcustomer_id);
  const sql = "SELECT * FROM Service_Item WHERE customer_id=?";
  connection.query(sql,[tcustomer_id], (err,result)=>{
      if(err) {
        console.log("oops, seems to be wrong")
        console.log(err)
      } 
      res.send(result)
    }
  );   
});

// Route to get service item by item_id
app.get('/api/searchitembyid/:item_id', (req,res)=>{
  const titem_id = req.params.item_id;
  console.log("received! target item id is:"+titem_id);
  const sql = "SELECT * FROM Service_Item WHERE item_id=?";
  connection.query(sql,[titem_id], (err,result)=>{
      if(err) {
        console.log("oops, seems to be wrong")
        console.log(err)
      } 
      res.send(result)
    }
  );   
});


  // const sql = 'SELECT * FROM Customer WHERE customer_id = 1';

  // connection.query(sql,(err,result)=>{
  //     if(err) {
  //       console.log("oops, seems to be wrong")
  //       console.log(err)
  //     } 
  //     res.send(result)
  //   }
  // );   
});

// app.get("/api/getspecficcustomer/:customer_id", (req,res)=>{
//   const customerId = req.params.customer_id;
//   const sql = "SELECT * FROM Customer WHERE customer_id = ?";
//   connection.query(sql, [customerId], (err,result)=>{
//       if(err) {
//         console.log(err)
//       } 
//       res.send(result)
//     }
//   );   
// });

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server~~~!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});