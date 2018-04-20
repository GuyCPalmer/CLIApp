var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazonDB"
});

connection.connect(function(err) {
    if (err) {
        throw err;
    }
    else {
        queryAllProducts();
        promptUser();
    }
})

function queryAllProducts() {
    connection.query("SELECT id, product_name, price FROM products", function(err, res) {
        if (err) throw err;
            console.table("\nOUR PRODUCTS", res);
    })
}

function promptUser() {
    inquirer.prompt([
        {
            name: "confirm",
            message: "Would you like to make a purchase today?\n",
            default: true
        },
        {
            name: "id",
            message: "What item would you like to Purchase?\n" 
        },
        {
            name: "quantity",
            message: "How many units would you like to buy?\n" 
        },
        {
            type: "confirm",
            name: "confirm",
            message: "Would you like to confirm this purchase?\n"
        }
    ]).then(function checkStore(answers) {
        //check database to see if there is enough product
        //if there is, fulfill customers order and log cost of purchase
        //if not, log we dont have enough in stock and prevent order from continuing.
    }).then(function () {
        endConnection();
    }).catch(function(err) {
        if (err) throw err;
    })
}

function endConnection() {
    connection.end();
}
