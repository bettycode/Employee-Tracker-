const inquirer = require("inquirer");
const mysql = require("mysql");
const consoleTable = require("console.table");


var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 8000,
  
    // Your username
    user: "root",
  
    // Your password
    password: "",
    database: "Employee-Traker-db"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    
  });