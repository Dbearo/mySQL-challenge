const inquirer = require("inquirer");
const mysql = require("mysql");

// const connection = mysql.createConnection({
//     host: 'localhost',

//     // Your port; if not 3306
//     port: 3306,

//     // Your username
//     user: 'root',

//     // Your password
//     password: 'r00t',
//     database: 'employeesDB'
// });

// connection.connect(function (err) {
//     if (err) throw err;
//     console.log("connected as id " + connection.threadId);
//     console.log(`
//     ╔═══╗─────╔╗──────────────╔═╗╔═╗
//     ║╔══╝─────║║──────────────║║╚╝║║
//     ║╚══╦╗╔╦══╣║╔══╦╗─╔╦══╦══╗║╔╗╔╗╠══╦═╗╔══╦══╦══╦═╗
//     ║╔══╣╚╝║╔╗║║║╔╗║║─║║║═╣║═╣║║║║║║╔╗║╔╗╣╔╗║╔╗║║═╣╔╝
//     ║╚══╣║║║╚╝║╚╣╚╝║╚═╝║║═╣║═╣║║║║║║╔╗║║║║╔╗║╚╝║║═╣║
//     ╚═══╩╩╩╣╔═╩═╩══╩═╗╔╩══╩══╝╚╝╚╝╚╩╝╚╩╝╚╩╝╚╩═╗╠══╩╝
//     ───────║║──────╔═╝║─────────────────────╔═╝║
//     ───────╚╝──────╚══╝─────────────────────╚══╝`)
//     // runs the app
  
// });

inquirer
.prompt([
  {
    type: "list",
    name: "start",
    message: "What would you like to do?",
    choices: [
      "View Departments",
      "View All Roles",
      "View All Employees",
      "Add Department",
      "Add Role",
      "Add Employee",
      "Update Employee",
      "End"
    ]
  }
])
.then(answers => {
  if (answers.start === "View Departments") {
    
  } else if (answers.start === "View All Roles"){

  } else if (answers.start === "View All Employees"){

  } else if (answers.start === "Add Department") {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'newDep',
          message: 'What is the name of the new Department?'
        }
      ])
      .then(({ newDep, addAnother }) => {
        // Here, you can perform actions with the newDep value, if needed.

        if (addAnother) {
          askNextQuestion(); // Ask the next question recursively
        } 
      });
  } else if (answers.start === "Add Role") {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'newRole',
          message: "What is the id of the new role's department?"
        },
        {
            type: 'input',
            name: 'newRoleS',
            message: 'What is the hourly wage of the new role?'
          },
          {
            type: 'input',
            name: 'newRoleD',
            message: 'What department of the new role?'
          }
      ])
      .then(({ newRole, addAnother }) => {
        // Here, you can perform actions with the newDep value, if needed.

        if (addAnother) {
          askNextQuestion(); // Ask the next question recursively
        } 
      });
  } else if (answers.start === "Add Employee") {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'newEmpF',
          message: 'What is the first name of the new Employee?'
        },
        {
            type: 'input',
            name: 'newEmpL',
            message: 'What is the last name of the new Employee?'
          },
          {
            type: 'input',
            name: 'newEmpR',
            message: 'What is the role id of the new employee?'
          },
          {
            type: 'input',
            name: 'newEmpM',
            message: "What is the id of the employee's manager?"
          },
        {
          type: 'confirm',
          name: 'addAnotherE',
          message: 'Do you want to add another department?',
          default: false
        }
      ])
      .then((data) => {
        // Here, you can perform actions with the newDep value, if needed.

        if (data.addAnotherE) {
          askNextQuestion(); // Ask the next question recursively
        } 
      });
  } else if (answers.start === "Update Employee") {
    inquirer
      .prompt([
        {
            type: "list",
            name: "UpdateChoice",
            message: "What would you like to update?",
            choices: [
              "First Name",
              "Last Name",
              "Role ID",
              "Manager ID",
              "End"
            ]
          },
        {
          type: 'confirm',
          name: 'addAnotherU',
          message: 'Do you want to add another department?',
          default: false
        }
      ])
      .then(({ newEmp, addAnotherU }) => {
        // Here, you can perform actions with the newDep value, if needed.

        if (addAnotherU) {
          askNextQuestion(); // Ask the next question recursively
        } 
      });
  } else if (answers.start === "End") {}
});
