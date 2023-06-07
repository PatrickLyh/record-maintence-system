// const mysql = require('mysql');

// const db = mysql.createConnection({
// host: 'localhost',
// port: 3306,
// database:'record',
// user: 'root',
// password: '33554261Lyh!'
// });

// db.connect(function (err) {
//     if(err){
//         console.log(err);
//         console.log("error occurred while connecting");
//     }
//     else{
//         console.log("connection created with Mysql successfully");
//     }
//  });

//  module.exports = db;

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '33554261Lyh!',
  database: 'record',
});

module.exports = connection;

// connection.connect((error) => {
//   if (error) {
//     console.error('Error connecting to MySQL database: ', error);
//     return;
//   }
//   console.log('Connected to MySQL database!');
// });

// // Use the connection object to query the database
// connection.query('SELECT * FROM Customer', (error, results, fields) => {
//   if (error) {
//     console.error('Error executing MySQL query: ', error);
//     return;
//   }
//   console.log('Query results: ', results);
// });

// // Close the connection when you're done with it
// connection.end();
