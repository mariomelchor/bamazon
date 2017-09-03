var inquirer = require('inquirer');
var connection = require('./db-connection.js');
var table = require('console.table');

// Establish DB Connection
connection.connect(function(err) {
  if (err) {
    console.error('Error Connecting: ' + err.stack);
    return;
  }

  supervisorTask();
});

// Ask what to do
var supervisorTask = function() {
  inquirer.prompt([{
    name: 'choice',
    type: 'list',
    choices: ['View Product Sales by Department', 'Create New Department'],
    message: "What would you like to do?",
  }]).then(function (answers) {
    switch(answers.choice) {
      case 'View Product Sales by Department':
        departmentSales();
        break;
      case 'Create New Department':
        createDepartment();
        break;
    }
  });
};

// Create New Department
var createDepartment = function() {
  inquirer.prompt([{
    type: 'input',
    name: 'department_name',
    message: 'What is the Department Name?'
  },
  {
    type: 'input',
    name: 'department_costs',
    message: 'What are the overhead costs?',
    // Validate if value a number
    validate: function(value) { 
      if ( isNaN(value) ) { 
        console.log('\n Please provide a number'); 
        return false; 
      } else if( value <= 0 ) {
        console.log('\n Please provide a number greater than 0'); 
        return false; 
      } else {
        return true;
      }
    }
  }]).then(function (answers) {

    console.log("Inserting a new department...\n");
    var query = connection.query(
      "INSERT INTO departments SET ?",
      {
        department_name:  answers.department_name,
        over_head_costs: answers.department_costs
      },
      function(err, res) {
        console.log(res.affectedRows + "\n Product Inserted! \n");
      }
    );
    // logs the actual query being run
    // console.log(query.sql);
    supervisorTask();

  });
};

var departmentSales = function() {
  // SQL Query String
  var sql = 'SELECT departments.department_id, departments.department_name, departments.over_head_costs, sum(products.product_sales) AS product_sales, sum(products.product_sales) - departments.over_head_costs AS total_profit ';
      sql += 'FROM departments ';
      sql += 'INNER JOIN products ON departments.department_name = products.department_name ';
      sql += 'GROUP BY departments.department_id';

  connection.query(sql, function (error, results, fields) {
	  if (error) throw error;
      console.log('\n');
      console.table(results);
	});
};