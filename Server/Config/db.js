const mysql = require('mysql');

const DB_config = 
 {
    host: 'localhost',   
    user: 'root',  
    password: '',
    database: 'vaccine',
  }

  const connection = mysql.createConnection(DB_config)
  connection.connect((err)=>
  {
      if(err)
      {
          console.log(err);
      }
      else 
      {
          console.log("mysql is connected");
      }
  })
  module.exports = connection