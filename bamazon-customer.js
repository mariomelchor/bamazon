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
}

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
        productsArray.push( products[index].product_name +' - $'+ products[index].price );
      }
      return productsArray;
    }
  }]).then(function (answers) {
    console.log(answers.choice);
  });
}