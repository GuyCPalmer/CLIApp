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

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    userInput()
});

var userInput = function () {
    inquirer.prompt([{
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
    }, ]).then(function (answers) {
        console.table(answers.selection);

        switch (answers.selection) {
            case "view low inventory":
                lowInventory();
                break;

            case "add to low inventory":
                addInventory();
                break;

            case "add new product":
                newProduct();
                break;

            case "leave":
                console.log("\nProgram has ended. \n")
                connection.end();
                break;
        };

    });
};

function newProduct() {
    connection.query("SELECT * FROM departments", function(err, res) {
        if(err) throw err;
    inquirer.prompt([{
            type: "input",
            name: "name",
            message: "What product would you like to add?"
        },
        {
            type: "input",
            name: "department",
            message: "What department will you be adding the product to?"
        },
        {
            type: "input",
            name: "cost",
            message: "How much does the product cost?"
        },
        {
            type: "input",
            name: "amount",
            message: "How many units would you like to add?"
        }
    ]).then(function (response) {
        console.log("Adding a new product\n");
        var query = connection.query("INSERT INTO products SET ?", {
            product_name: response.name,
            department_name: response.department,
            price: response.cost,
            quantity: response.amount
        });
        console.log("\nInventory Updated.\n")
        userInput();
    });
});

function lowInventory() {
    var query = "SELECT item_id, product_name, department_name, price, stock_quantity FROM products WHERE stock_quantity BETWEEN 0 and 5";
    connection.query(query, function (err, res) {
            for (var i = 0; i < res.length; i++) {
                console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + "$" + res[i].price + " | " + res[i].stock_quantity);
            }
            console.log("-----------------------------------");
        userInput();
    });

};

function queryAllProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + "$" + res[i].price + " | " + res[i].stock_quantity);
            //end of for loop
        }
        console.log("-----------------------------------");
        userInput();
        //end of connection.query
    });

    //end of queryAllProducts()
};

function addInventory() {
    inquirer.prompt([{
            type: "input",
            name: "number",
            message: "What is the product id number of the product would you like to add inventory to?"
        },
        {
            type: "input",
            name: "amount",
            message: "How many units of this product would you like to add?"
        }
    ]).then(function (retort) {
        console.log("Inserting a new product...\n");
        var query = connection.query("SELECT * FROM products WHERE item_id=?", retort.number, function (err, res) {
            var amount = parseInt(retort.amount);
            var stockMe = res[0].stock_quantity + amount;
            var query = connection.query("UPDATE products SET ? WHERE ?", [{
                    stock_quantity: stockMe
                },
                {
                    item_id: retort.number
                }
            ]);
            console.log("\n Product added.\n");
            userInput();
        });
    });
}
}
