var inquirer = require('inquirer');
var connection = require('./db-connection.js');

// Establish DB Connection
connection.connect(function(err) {
  if (err) {
    console.error('Error Connecting: ' + err.stack);
    return;
  }

  managerTask();
});

var managerTask = function() {
  // Ask User how many to buy
  inquirer.prompt([{
    name: 'choice',
    type: 'list',
    choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product'],
    message: "What would you like to do?",
  }]).then(function (answers) {
    switch(answers.choice) {
      case 'View Products for Sale':
        showProducts();
        break;
      case 'View Low Inventory':
        viewLowInventory();
        break;
      case 'Add to Inventory':
        addInventory();
        break;
      case 'Add New Product':
        addProduct();
        break;
    }
  });
}

// Show all Products in DB
var showProducts = function() {
	connection.query('SELECT * FROM products', function (error, results, fields) {
	  if (error) throw error;
	  
    var products = results;
    for (var index = 0; index < products.length; index++) {
      console.log('Prod ID: ' + products[index].item_id + ' ' + products[index].product_name + ' $'+ products[index].price);
      console.log('Department: ' + products[index].department_name + 'Sock Quantity: ' + products[index].stock_quantity);
      console.log('----------------------- \n');
    }

    managerTask();

	});
};

// Add Product to DB
var addProduct = function() {
  inquirer.prompt([{
    type: 'input',
    name: 'product_name',
    message: 'What is the Product Name?'
  },
  {
    type: 'input',
    name: 'department',
    message: 'What department does this product belong to?'
  },
  {
    type: 'input',
    name: 'price',
    message: 'What is the price?',
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
  },
  {
    type: 'input',
    name: 'stock',
    message: 'How many products are in stock?',
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
  },
  ]).then(function (answers) {

    console.log("Inserting a new product...\n");
    var query = connection.query(
      "INSERT INTO products SET ?",
      {
        product_name:  answers.product_name,
        department_name: answers.department,
        price: answers.price,
        stock_quantity: answers.stock
      },
      function(err, res) {
        console.log(res.affectedRows + " Product Inserted!\n");
      }
    );
    // logs the actual query being run
    // console.log(query.sql);

  });
}