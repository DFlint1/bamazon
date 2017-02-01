//this set up code will connect with the database bamazon
var mysql = require("mysql");
var inquirer = require("inquirer");
var prompt = require ("prompt");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});

//this code will print all the products of the database bamazon to the terminal
connection.query("SELECT * FROM products", function(err, res) {
  for (var i = 0; i < res.length; i++) {
    console.log(res[i].item_id + " | " + res[i].product_name
    + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
  }
  console.log("-----------------------------------");

   
        inquireForPurchase();
    });



function inquireForPurchase() {
    //get item ID and desired quantity from user. 
    inquirer.prompt([

        {
            name: "ID",
            type: "input",
            message: "What is the item number of the item you would like to purchase?"
        }, {
            name: 'Quantity',
            type: 'input',
            message: "How many many would you like to buy?"
        },

    ]).then(function(answers) {
        //set input as variables
        var quantityDesired = answers.Quantity;
        var IDDesired = answers.ID;
        purchaseFromDatabase(IDDesired, quantityDesired);  //pass variables as parameters.
    });

}; //end inquireForPurchase
function purchaseFromDatabase(ID, quantityDesired) {
    //check quantity of desired purchase and inform user "the amount desired not in stock" 
    connection.query('SELECT * FROM Products WHERE item_id = ' + ID, function(error, response) {
        if (error) { console.log(error) };

        //if in stock
        if (quantityDesired <= response[0].stock_quantity) {
            //calculate cost
            var totalCost = response[0].price * quantityDesired;
            //inform user
            console.log("We have what you need! I'll have your order right out!");
            console.log("Your total cost for " + quantityDesired + " " + response[0].product_name
             + " is " + totalCost + ". Thank you for your Business!");
            //update database, minus purchased quantity
            connection.query('UPDATE Products SET stock_quantity = stock_quantity - ' + quantityDesired+ ' WHERE item_id = ' + ID);
        } else {
            console.log("Our apologies. We don't have enough " + response[0].product_name + " to fulfill your order.");
        };
       
    });

}; 

