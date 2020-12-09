const inquirer = require("inquirer");
const mysql = require("mysql");
const consoleTable = require("console.table");
const figlet = require("figlet");
var clear = require('clear');

// ---------connection--------
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

  
 
figlet('EMPLOYEE-TRAKER!!', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
   
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
                console.log("");
                viewAllEmployees();
                break;

                case"View All Employees By Department":
                console.log("");
                viewAllEmployeesD();
                break;

                case"View All Employees By Manager":
                console.log("");
                viewAllEmployeesM();
                break;

                case"Add Employee":
                console.log("");
                addEmployees();
                break;

                case"Remove Empolyee":
                console.log("");
                removeEmployees();
                break;

                case"Update Employee Role":
                console.log("");
                updateRole();
                break;

                case"Update Employee Manager":
                console.log("");
                updateManager();
                break;

                case"view All Roles":
                console.log("");
                viewRoles();
                break;

                case"Add Role":
                console.log("");
                addRole();
                break;

                case"Remove Role":
                console.log("");
                removeRole();
                break;

                case"View All Departments":
                console.log("");
                viewDepartments();
                break;

                case"Add Department":
                console.log("");
                addDepartment();
                break;

                case"Remove Department":
                console.log("");
                removeDepartment();
                break;

                case"Quit":
                console.log("");
                quit();
                break;

                
            }
        })
}  


// View All Employees
function viewAllEmployees(){
    var query =
    `SELECT e.id, e.first_name, e.last_name, role_title, d.name AS department,role_salary, CONCAT(m.first_name, ' ', m.last_name) AS manager 
    FROM employee e
    LEFT JOIN role r
    ON e.role_id = r.id
    LEFT JOIN department d
    ON d.id = r.department_id
    LEFT JOIN employee m
    ON m.id = e.manager_id`
    
    connection.query(query, function (err, res) {
        if (err) throw err;
    
        console.table(res);
        console.log("All Employees!\n");

        start();
    
    }  ) 
    // const query ="SELECT * FROM employee" ;
    // connection.query(query,function(err, res){
    //     if (err) throw err;
    //     console.table(res);
    //     console.log("");
    //     console.log("---------------------------------");

    //     start();
    // })

    

}

// View All Employees By Department
function viewAllEmployeesD(){
    const query ="SELECT employee.id,first_name, last_name, role_id, manager_id FROM employee RIGHT OUTER JOIN role ON role_id = role.id"
    connection.query(query,function(err, res){
        if (err) throw err;
        console.table(res);
        console.log("");
        console.log("---------------------------------");

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
        console.log("---------------------------------");
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
        console.log("---------------------------------");
        start();
    })

}

// Add Roles

function addRole(){
    inquirer
    .prompt
    ( [
        {
            name:"role_title",
            type:"input",
            message:"Enter Role Title",
        },
        {
            name:"role_salary",
            type:"number",
            message:"Enter Role Salary",
        },
        {
            name:"department_id",
            type:"number",
            message:"Enter Department ID",
        }
       

    
    ])
    .then(function(data){
        connection.query("INSERT INTO role SET ?",
       [  
           {
            
            role_title: data.role_title,
            role_salary: data.role_salary,
            department_id:data.department_id
          
           }
       ],
        
        function(err, res){
            if(err)throw err;
            console.log(`Roles title ${data.role_title} Salary ${data.role_salary} and department ID ${data.department_id} Sussessfuly added.`)
            console.log("");
            console.log("---------------------------------");
            start();
        }
        )
    })
}

// Remove Role

function  removeRole(){
    inquirer
    .prompt
    ( [
        {
            name:"id",
            type:"number",
            message:"Enter Role ID",
        },
    
    ])
    .then(function(data){
        connection.query("DELETE FROM role WHERE ?",
        {
            id: data.id,
           
        },
        
        function(err, res){
            if(err)throw err;
            console.log(`Role ${data.id} is Sussessfuly Removed` )
            console.log("");
            console.log("---------------------------------");
            start();
        }
        )
    })
}

//View All Departments
function viewDepartments(){
    const query ="SELECT * FROM department" ;
    connection.query(query,function(err, res){
        if (err) throw err;
        console.table(res);
        console.log("");
        console.log("---------------------------------");
        start();
    })

}

//Add Departments


function  addDepartment(){
    inquirer
    .prompt
    ( [
        {
            name:"name",
            type:"input",
            message:"Enter Department Title",
        },
        
       

    
    ])
    .then(function(data){
        connection.query("INSERT INTO department SET ?",
       [  
           {
            
            name: data.name,
           
          
           }
       ],
        
        function(err, res){
            if(err)throw err;
            console.log(`Department ${data.name}  Sussessfuly added.`)
            console.log("");
            console.log("---------------------------------");
            start();
        }
        )
    })
}
// Remove Department

function removeDepartment(){
    inquirer
    .prompt
    ( [
        {
            name:"id",
            type:"number",
            message:"Enter Department ID",
        },
    
    ])
    .then(function(data){
        connection.query("DELETE FROM department WHERE ?",
        {
            id: data.id,
           
        },
        
        function(err, res){
            if(err)throw err;
            console.log(`Department ${data.id} is Sussessfuly Removed` )
            console.log("");
            console.log("---------------------------------");
            start();
        }
        )
    })
}

//Update Employee Role

function  updateRole(){
    
    inquirer

    .prompt(
        [
            {
                name:"id",
                type:"numbe",
                message:"Enter employee ID",
            },

            {
                name:"roleID",
                type:"number",
                message:"Enter the updated role ID",
            }

           
        ])
        .then(function(data){
            connection.query("UPDATE employee SET ? WHERE ?",
            [
                {role_id:data.roleID},
                 {id:data.id},
            ],
            function(err,res){
                if(err)throw err;
                console.log(`Employee ID ${data.id} updated with role ID ${data.roleID}`)
                console.log("");
                console.log("---------------------------------");
                start();
            }
            )
        })


}

//Update Employee Manager
function updateManager(){
    inquirer

    .prompt(
        [
            {
                name:"id",
                type:"numbe",
                message:"Enter employee ID",
            },

            {
                name:"managerID",
                type:"number",
                message:"Enter the updated Manager ID",
            }

           
        ])
        .then(function(data){
            connection.query("UPDATE employee SET ? WHERE ?",
            [
                {manager_id:data.managerID},
                 {id:data.id}
            ],
            function(err,res){
                if(err)throw err;
                console.log(`Employee ID ${data.id} updated with manager ID ${data.managerID}`)
                console.log("");
                console.log("---------------------------------");
                start();
            }
            )
        })

}

//Add Employee
function  addEmployees(){
    inquirer
    .prompt
    ( [
        {
            name:"first_name",
            type:"input",
            message:"Enter Employee First Name",
        },
        {
            name:"last_name",
            type:"Input",
            message:"Enter Employee Last Name",
        },
        {
            name:"role_id",
            type:"number",
            message:"Enter role ID",
        },
        {
            name:"manager_id",
            type:"number",
            message:"Enter manager ID",
        },
        
    
    ])
    .then(function(data){
        connection.query("INSERT INTO employee SET ?",
        {
            first_name: data.first_name,
            last_name: data.last_name,
            role_id:data.role_id,
            manager_id: data.manager_id,
        },
       
        
        
        function(err, res){
            if(err)throw err;
            console.log(`Employee First Name ${data.first_name} Last Name ${data.last_name} with role ID ${data.role_id} and manager ID${data.manager_id} is Sussessfuly added.`)
            
            console.log("");
            console.log("---------------------------------");
            start();
        }
        )
    
    })
}

// Remove Employee
//DELETE FROM table_name WHERE condition;

function removeEmployees(){
    inquirer
    .prompt
    ( [
        {
            name:"id",
            type:"number",
            message:"Enter Employee ID",
        },
    
    ])
    .then(function(data){
        connection.query("DELETE FROM employee WHERE ?",
        {
            id: data.id,
           
        },
        
        function(err, res){
            if(err)throw err;
            console.log(`Employee ${data.id} is Sussessfuly Removed` )
            console.log("");
            console.log("---------------------------------");
            start();
        }
        )
    })
}

function quit(){
    clear();
    connection.end();
   
}