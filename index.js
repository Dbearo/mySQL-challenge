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
      const [rows,fields] = await pool.query('select title, roles_id, name, salary from roles inner join department on roles.department_id = department.department; ');
      console.log(rows)
      mainMenu();
    } else if (answers.start === "View All Employees") {
      const [rows,fields] = await pool.query(`SELECT e.employee_id , e.first_name , e.last_name , r.title , 
      d.name as departmaent , r.salary , m.first_name AS manager_first_name , m.last_name AS manager_last_name
  FROM 
      employee e
  LEFT JOIN 
      roles r ON e.role_id = r.roles_id
  LEFT JOIN 
      department d ON r.department_id = d.department
  LEFT JOIN 
      employee m ON e.manager_id = m.employee_id;`);
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

mainMenu();

function askNewDep() {
  inquirer.prompt(addDep).then((data) => {
    pool.query(`INSERT INTO department (name)
    VALUES ("${data.newDep}");`);
    if (data.addAnotherD) {
      askNewDep();
    } else {mainMenu();}
  });
}
function askNewRole() {
  inquirer.prompt(addRole).then((data) => {
    let salary = parseInt(data.newRoleS)
    let department = parseInt(data.newRoleD)
    pool.query(`INSERT INTO roles (title, salary, department_id)
    VALUES ("${data.newRole}", ${salary}, ${department});`);
    if (data.addAnotherR) {
      askNewRole();
    } else{mainMenu();}
  });
}

function askNewEmp() {
  inquirer.prompt(addEmp).then((data) => {
    let role = parseInt(data.newEmpR)
    let manager = parseInt(data.newEmpM)
    pool.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES ("${data.newEmpF}", "${data.newEmpL}", ${role}, ${manager});`);
    if (data.addAnotherE) {
      askNewEmp(); 
    } else {mainMenu();}
  });
}

//functions for updating employee

function updateEmpf() {
  inquirer.prompt(updateEmp).then((data) => {
    let eID = parseInt(data.UpdateEmpID)
    if (data.UpdateChoice === 'First Name') {
      let goal = 'first_name'
      updateFinal(updateFN,goal,eID);
    } else if (data.UpdateChoice === 'Last Name') {
      let goal = 'last_name'
      updateFinal(updateLN,goal,eID);
    } else if (data.UpdateChoice === 'Role ID') {
      let goal = 'role_id'
      updateFinal(updateRID,goal,eID);
    } else if (data.UpdateChoice === 'Manager ID') {
      let goal = 'manager_id'
      updateFinal(updateMID,goal,eID);
    } 
      if (data.UpdateChoice === 'End') {
       mainMenu(); 
      } 
  });
}

async function updateFinal(question, goal, eID) {
  try {
    const data = await inquirer.prompt(question);
    await pool.query(`UPDATE employee
      SET ${goal} = ?
      WHERE id = ?`, [data.update, eID]);

    console.log("Employee updated successfully!");
  } catch (error) {
    console.error("Error updating employee:", error);
  }

  mainMenu();
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
    message: "What is the name of the new role?"
  },
  {
    type: 'input',
    name: 'newRoleS',
    message: 'What is the hourly wage of the new role?'
  },
  {
    type: 'input',
    name: 'newRoleD',
    message: `What is the id of the new role's department?`
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
    name: 'UpdateEmpID',
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
