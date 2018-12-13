const nodeInput = process.argv[2];
const inquirer = require("inquirer");
// const mysql = require("mysql");



if (nodeInput === "runPrompt") {
    runPrompt();
}

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