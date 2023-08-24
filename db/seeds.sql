USE employeesDB;
-- setting up exmple departments
INSERT INTO department (name)
VALUES ("Floor");
INSERT INTO department (name)
VALUES ("Produce");
INSERT INTO department (name)
VALUES ("Deli");
INSERT INTO department (name)
VALUES ("Bakery");
-- setting up example roles
INSERT INTO role (title, salary, department_id)
VALUES ("Floor Manager", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUES (" Manager", 150000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Floor Manager", 120000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Floor Manager", 125000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Floor Manager", 250000, 4);
-- setting up example employees
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jane", "Doe", 1, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Norah", "Rios", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kate", "Mellor", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Shiv", "Betts", 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Leen", "Hurst", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Gary", "Leer", 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tom", "Cruise", 4, 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Daisy", "Hooper", 1, 2);