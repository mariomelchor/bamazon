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
    
    // loop through products
    for (var index = 0; index < products.length; index++) {
      console.log( products[index].item_id +' - '+ products[index].product_name +' - $'+products[index].price );
    };
    
	});
}