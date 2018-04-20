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
    if (err) throw err;
    managerView();
})

function managerView() {
    var questions = [{
        name: "selection",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "view products",
            "view low inventory",
            "add to low inventory",
            "add new products",
            "leave"
        ]
    }]
}