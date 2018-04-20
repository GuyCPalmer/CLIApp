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
    if (err) {
        throw err;
    } else {
        queryAllProducts();
        promptUser();
    }
})

function queryAllProducts() {
    connection.query("SELECT id, product_name, price FROM products", function (err, res) {
        if (err) throw err;
        console.table("\nOUR PRODUCTS", res);
    })
}

function promptUser() {
    inquirer.prompt([
            {
                name: "id",
                message: "What item would you like to purchase today?"
            },
            {
                name: "quantity",
                message: "How many units would you like to purchase?\n"
            }
        ]).then(function checkStore(answers) {
            for (var i = 0; i < res.length; i++) {
                if (parseInt(ansers.id) === res[i].id) {
                    if (res[i].quanitiy >= (parseInt(answers.quantity))) {
                        console.log("\nThank you for your order.");

                        var purchaseCost = parseFloat(res[i].price * answers.quantity);
                        console.table("\nYour total is: $" + purchaseCost.toFixed(2));

                        var newQuantity = res[i].quantity - (parseInt(answers.quantity));

                        connection.query("UPDATE products SET ? Where ?", [{
                            quntity: newQuantity
                        }, {
                            id: answers.id
                        }], function (err, res) {
                            if (err) console.log(err);
                            else {
                                printUpdatedProducts();
                            }
                        })
                    } else {
                        console.log("\nI'm sorry, we dont enough in stock, but will be recieving a new shipment soon!\n");
                        promptUser(res);
                    }
                }
            }
        })
        .catch(function (err) {
            if (err) {
                console.log(err);
            }
        })
}

function printUpdatedProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        if(err) throw err;
        console.log("");
        for (var i = 0; i < res.length; i++) {
            console.table(res[i].product_name + " | Quantity left: " + res[i].quantity);
        }
    })
    connection.end();
}