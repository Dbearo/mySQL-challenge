const inquirer = require("inquirer");
const mysql = require("mysql2");

const pool = mysql.createPool({
    host: 'localhost',

    // Your username
    user: 'root',

    // Your password
    password: 'r00t',
    database: 'employeesDB'
}).promise()
function mainMenu(){
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
  .then(async answers => {
    if (answers.start === "View Departments") {
      const [rows,fields] = await pool.query('SELECT * FROM department');
      console.log(rows)
      mainMenu();
    } else if (answers.start === "View All Roles") {
      const [rows,fields] = await pool.query('SELECT * FROM roles');
      console.log(rows)
      mainMenu();
    } else if (answers.start === "View All Employees") {
      const [rows,fields] = await pool.query('SELECT * FROM employee');
      console.log(rows)
      mainMenu();
    } else if (answers.start === "Add Department") {
      askNewDep();
    } else if (answers.start === "Add Role") {
      askNewRole();
    } else if (answers.start === "Add Employee") {
      askNewEmp();
    } else if (answers.start === "Update Employee") {
      updateEmpf();
    } else if (answers.start === "End") { 
      process.exit(); 
    }
  });
}
pool.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jude", "Hartmann", 4, 4);`);
mainMenu();

function askNewDep() {
  inquirer.prompt(addDep).then((data) => {
    // Here, you can perform actions with the newDep value, if needed.

    if (data.addAnotherD) {
      askNewDep(); // Ask the next question recursively
    } else {mainMenu();}
  });
}
function askNewRole() {
  inquirer.prompt(addRole).then((data) => {
    // Here, you can perform actions with the newDep value, if needed.

    if (data.addAnotherR) {
      askNewRole(); // Ask the next question recursively
    } else{mainMenu();}
  });
}

function askNewEmp() {
  inquirer.prompt(addEmp).then((data) => {
    // Here, you can perform actions with the newDep value, if needed.

    if (data.addAnotherE) {
      askNewEmp(); // Ask the next question recursively
    } else {mainMenu();}
  });
}

//inquirer prompts 
const addDep = [
  {
    type: 'input',
    name: 'newDep',
    message: 'What is the name of the new Department?'
  },
  {
    type: 'confirm',
    name: 'addAnotherD',
    message: 'Do you want to add another department?',
    default: false
  }
];

const addRole = [
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
  },
  {
    type: 'confirm',
    name: 'addAnotherR',
    message: 'Do you want to add another department?',
    default: false
  }
];

const addEmp = [
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
    message: 'Do you want to add another employee?',
    default: false
  }
]
//Prompts for updating employee

const updateEmp = [
  {
    type: 'input',
    name: 'UpdateEmpQ',
    message: "What is the id of the employee you want to change?"
  },
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
  }
];

const updateFN = [
  {
    type: 'input',
    name: 'update',
    message: 'what is the new first name of the employee?'
  }
]

const updateLN = [
  {
    type: 'input',
    name: 'update',
    message: 'what is the new last name of the employee?'
  }
]

const updateRID = [
  {
    type: 'input',
    name: 'update',
    message: 'what is the new role ID name of the employee?'
  }
]

const updateMID = [
  {
    type: 'input',
    name: 'update',
    message: 'what is the new manager ID name of the employee?'
  }
]
//functions for updating employee

function updateEmpf() {
  inquirer.prompt(updateEmp).then((data) => {
    // Here, you can perform actions with the newDep value, if needed.
    if (data.UpdateChoice === 'First Name') {
      updateFinal(updateFN);
    } else if (data.UpdateChoice === 'Last Name') {
      updateFinal(updateLN);
    } else if (data.UpdateChoice === 'Role ID') {
      updateFinal(updateRID);
    } else if (data.UpdateChoice === 'Manager ID') {
      updateFinal(updateMID);
    } 
      if (data.addAnotherU) {
        askNextQuestion(); // Ask the next question recursively
      } else{mainMenu();}
  });
}

function updateFinal(question) {
  inquirer.prompt(question).then((data) => {
    console.log(data.update)
  });
}