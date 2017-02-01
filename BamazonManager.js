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
  inquireForSelection();
});
// connection.connect(function(err) {
//   if (err) throw err;
//   console.log("connected as id " + connection.threadId);
// });



//this code will list the menu options and prompt the Manager to select from the options
    function inquireForSelection() {
    
    //provide muliple choices 
    inquirer.prompt({
    name: "action",
    type: "rawlist",
    message: "Please make a selection from the choices provided below.",
    choices: [
      "View Products for Sale",
      "View Low Inventory",
      "Add to Inventory",
      "Add New Product"
     ]
  }).then(function(answer) {
    switch (answer.action) {

      case "View Products for Sale":
        viewRequest();
        break;

      case "View Low Inventory":
        depletedRequest();
        break;

      case "Add to Inventory":
        restockRequest();
        break;

      case "Add New Product":
        addRequest();
        break;
       }
  });
};

//===========================================================================insert taken out
function viewRequest() {
var query = "SELECT * FROM products";
  connection.query(query, function(err, res) {
    for (var i = 0; i < res.length; i++) {
     console.log(res[i].item_id + " | " + res[i].product_name
    + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
  }
  console.log("-----------------------------------");
    });
}; //end viewRequest
//==========================================================================insert taken out

// depletedRequest();//this code will list all of the items with a stock_quantity of <5.
function depletedRequest() {
  var query = "SELECT * FROM products WHERE stock_quantity < 5";
  connection.query(query, function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + " | " + res[i].product_name
    + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
  }
  console.log("-----------------------------------");
    });
}; //end depletedRequest

//==========================================================================insert taken out

///this code will ask for info to restock items
function restockRequest() {
    //gather data from user and allow manager to increase the inventory of an item
    inquirer.prompt([

        {
            name: "item_id",
            type: "input",
            message: "What is the item number of the item you wish to restock?"
        }, {
            name: 'stock_quantity',
            type: 'input',
            message: "How many would you like to add?"
        },

    ]).then(function(answers) {
        //set captured input as variables, pass variables as parameters.
        var quantityAdded = answers.stock_quantity;
        var IDOfProduct = answers.item_id;
        restockDatabase(IDOfProduct, quantityAdded);
    });
}; //end restockRequest

//runs on user parameters from the request function
function restockDatabase(item_id, stock_quantity) {
    //update the database
    connection.query('SELECT * FROM Products WHERE item_id = ' + item_id, function(error, response) {
        if (error) { console.log(error) };
        connection.query('UPDATE Products SET stock_quantity = stock_quantity + ' + stock_quantity + ' WHERE item_id = ' + item_id);

        // function viewRequest ();
    });
    };
 //end restockDatabase

 //=============================================================================insert taken out
 
//this code will ask for a new item to insert into inventory categories
function addRequest() {
    inquirer.prompt([

        {
            name: "item_id",
            type: "input",
            message: "What is the id of the item you want to add to inventory?"
        },
        {
            name: 'product_name',
            type: 'input',
            message: "What is the name for this product?"
        },
        {
            name: 'department_name',
            type: 'input',
            message: "What department does this item belong to?"
        },
        {
            name: 'price',
            type: 'input',
            message: "How much would you like this to cost?"
        },
        {
            name: 'stock_quantity',
            type: 'input',
            message: "How many units of this item would you like to add to stock?"
        },

    ]).then(function(answers){
        //gather user input, store as variables, pass as parameters
    	var item_id = answers.item_id;
    	var product_name = answers.product_name;
        var department_name = answers.department_name;
    	var price = answers.price;
    	var stock_quantity = answers.stock_quantity;
    	buildNewProduct(item_id,product_name,department_name, price, stock_quantity);
    });
}; //end addRequest

 //query database, insert new product
function buildNewProduct(item_id,product_name,department_name, price, stock_quantity){
   	connection.query('INSERT INTO Products (item_id,product_name,department_name, price, stock_quantity) VALUES("' + item_id + '","' + product_name + '",'+ department_name + '",' + price + ',' + stock_quantity +  ')');
};//end buildNewProduct
 