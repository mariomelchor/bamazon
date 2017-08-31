var inquirer = require('inquirer');
var connection = require('./db-connection.js');

// Establish DB Connection
connection.connect(function(err) {
  if (err) {
    console.error('Error Connecting: ' + err.stack);
    return;
  }

  showProducts();
});

// Show all Products in DB
var showProducts = function() {
	connection.query('SELECT * FROM products', function (error, results, fields) {
	  if (error) throw error;
	  
    var products = results;
    purchaseProducts(products);
	});
};

// Ask user which product to purchase
var purchaseProducts = function(products) {
  inquirer.prompt([{
    name: 'choice',
    type: 'list',
    pageSize: 100,
    message: "What product would you like to purchase?",
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
          message: "How many would you like to buy?",
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
          var prodQty = answers.choice;

          // Check if there's enough in stock
          if(prodPurchased.stock_quantity >= prodQty) {
            console.log('There is enough to buy');
          } else {
            console.log('Sorry Insufficient quantity!');
          }

        });
      }
    }

  });
};