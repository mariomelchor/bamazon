var inquirer = require('inquirer');
var connection = require('./db-connection.js');

// Establish DB Connection
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});