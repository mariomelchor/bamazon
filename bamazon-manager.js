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
      console.log('Department: ' + products[index].department_name + ' Stock Quantity: ' + products[index].stock_quantity);
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
    var query = connection.query(
      "INSERT INTO products SET ?",
      {
        product_name:  answers.product_name,
        department_name: answers.department,
        price: answers.price,
        stock_quantity: answers.stock
      },
      function(err, res) {
        console.log("\n\n New Product Added!\n");
      }
    );
    // logs the actual query being run
    // console.log(query.sql);
    managerTask();

  });
};

// View prodoct inventory if less than 10
var viewLowInventory = function() {
	connection.query('SELECT * FROM products WHERE stock_quantity < 10', function (error, results, fields) {
	  if (error) throw error;
	  
    var products = results;
    for (var index = 0; index < products.length; index++) {
      console.log('Prod ID: ' + products[index].item_id + ' ' + products[index].product_name + ' $'+ products[index].price);
      console.log('Department: ' + products[index].department_name + ' Stock Quantity: ' + products[index].stock_quantity);
      console.log('----------------------- \n');
    }

    managerTask();

	});
};

var addInventory = function() {
  connection.query('SELECT * FROM products', function (error, results, fields) {
	  if (error) throw error;
	  
    var products = results;
  
    inquirer.prompt([{
      name: 'choice',
      type: 'list',
      pageSize: 100,
      message: "What product would you like to Add Inventory?",
      choices: function(value){
        var productsArray =[];
        // loop through products and return array for choices
        for (var index = 0; index < products.length; index++) {
          productsArray.push({
            name:  products[index].product_name +' - $'+ products[index].price,
            value: products[index].item_id,
            short: products[index].product_name
          });
        }
        return productsArray;
      }
    }]).then(function (answers) {

      for (var index = 0; index < products.length; index++) {
        if(products[index].item_id === answers.choice) {

          // Store product purchased obj
          var prodPurchased = products[index];
          
          // Ask User how many to buy
          inquirer.prompt([{
            name: 'choice',
            type: 'input',
            message: "How many units would you like to add?",
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
            },
          }]).then(function (answers) {

            // Store Qty
            var addQty = answers.choice;
            var newQty = parseInt(prodPurchased.stock_quantity)  +  parseInt(addQty);

            // Update quantity purchased in DB
            var query = connection.query(
              "UPDATE products SET ? WHERE ?",
              [
                {
                  stock_quantity: newQty 
                },
                {
                  item_id:  prodPurchased.item_id
                }
              ],
              function(err, res) {
                if(err) throw err;
                // console.log(res.affectedRows + " product updated!\n");
              }
            );
          
            // logs the actual query being run
            // console.log(query.sql);
            console.log('\nInventory has been increased for ' + prodPurchased.product_name + ' New Inventory is: ' + newQty +'\n');
            managerTask();

          });
        }
      }

    });
  });
}