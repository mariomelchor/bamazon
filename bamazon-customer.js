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
          var prodQtyPurchased = answers.choice;
          var newQty = parseInt(prodPurchased.stock_quantity) - parseInt(prodQtyPurchased);
          var totalSale = prodPurchased.price * parseInt(prodQtyPurchased);
          var currentSales = prodPurchased.product_sales + totalSale;

          // Check if there's enough in stock
          if(prodPurchased.stock_quantity >= prodQtyPurchased) {
            // Update quantity purchased in DB
            var query = connection.query(
              "UPDATE products SET ? WHERE ?",
              [
                {
                  stock_quantity: newQty,
                  product_sales: currentSales
                },
                {
                  item_id: prodPurchased.item_id
                }
              ],
              function(err, res) {
                if(err) throw err;
                // console.log(res.affectedRows + " product updated!\n");
              }
            );
          
            // logs the actual query being run
            // console.log(query.sql);
            console.log('Your Total Cost: ' +  totalSale);

          } else {
            console.log('Sorry Insufficient quantity! \n');
            purchaseProducts(products);
          }

        });
      }
    }

  });
};