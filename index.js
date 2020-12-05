const inquirer = require("inquirer");
const mysql = require("mysql");
const consoleTable = require("console.table");


var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "MG@itbGcthate#1S",
    database: "Employee_Traker_db"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    
    start();
  });

function start(){ 
    inquirer
        .prompt(
            {
                type:"list",
                name:"choice",
                message:"What would you like to do?",
                choices:[
                    "View All Employees",
                    "View All Employees By Department",
                    "View All Employees By Manager",
                    "Add Employee",
                    "Remove Empolyee",
                    "Update Employee Role",
                    "Update Employee Manager",
                    "view All Roles",
                    "Add Role",
                    "Remove Role",
                    "View All Departments",
                    "Add Department",
                    "Remove Department",
                    "Quit"

                ]


            } 
        )
        .then(function(data){
            switch(data.choice){
                case"View All Employees":
                viewAllEmployees();
                break;

                case"View All Employees By Department":
                viewAllEmployeesD();
                break;

                case"View All Employees By Manager":
                viewAllEmployeesM();
                break;

                case"Add Employee":
                addEmployees();
                break;

                case"Remove Empolyee":
                removeEmployees();
                break;

                case"Update Employee Role":
                updateRole();
                break;

                case"view All Roles":
                viewRoles();
                break;

                case"Add Role":
                addRole();
                break;

                case"Remove Role":
                removeRole();
                break;

                case"View All Departments":
                viewDepartments();
                break;

                case"Add Department":
                addDepartment();
                break;

                case"Remove Department":
                removeDepartment();
                break;

                case"Quit":
                quit();
                break;

                
            }
        })
}  


// View All Employees
function viewAllEmployees(){
    const query ="SELECT * FROM employee" ;
    connection.query(query,function(err, res){
        if (err) throw err;
        console.table(res);
        console.log("");
        start();
    })

}
// View All Employees By Department
function viewAllEmployeesD(){
    const query ="SELECT employee.id,first_name, last_name, role_id, manager_id FROM employee RIGHT OUTER JOIN role ON role_id = role.id"
    connection.query(query,function(err, res){
        if (err) throw err;
        console.table(res);
        console.log("");
        start();
    })

}

//View All Employees By Manager

function viewAllEmployeesM(){
    const query ="SELECT * FROM employee  WHERE manager_id is not null" ;
    connection.query(query,function(err, res){
        if (err) throw err;
        console.table(res);
        console.log("");
        start();
    })

}

//view All Roles

function viewRoles(){
    const query ="SELECT role.id,role_title, role_salary,department_id FROM role LEFT OUTER JOIN department ON department_id = department.id" ;
    connection.query(query,function(err, res){
        if (err) throw err;
        console.table(res);
        console.log("");
        start();
    })

}

//View All Departments
function viewDepartments(){
    const query ="SELECT * FROM department" ;
    connection.query(query,function(err, res){
        if (err) throw err;
        console.table(res);
        console.log("");
        start();
    })

}