const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rootroot123*",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    else console.log(`Your connection to port #${connection.config.port} was successful!`);
});

connection.query(
    "SELECT * FROM products WHERE id = 4",
    function (err, res) {
        if (err) throw err;
        console.log(res[0].product_name);
    }
);

function runPrompt() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "What product ID would you like to purchase?",
                choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                name: "productChoice"
            },
            {
                type: "list",
                message: "How many units of this product would you like to buy?",
                choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Enter your quantity"],
                name: "productQuantity"
            }
        ])
        .then(function (answer) {
            console.log(`You Chose: ${answer.productChoice}`);
            console.log(`You Chose: ${answer.productQuantity}`);
        });
}