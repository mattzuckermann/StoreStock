const inquirer = require("inquirer");
const mysql = require("mysql");

console.log(`
=================================
Attempting to connect to database
=================================
`);

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rootroot123*",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    else console.log(`Your connection to port #${connection.config.port} was successful!\n`);
    runPrompt();
});

function runPrompt() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "What Bamazon product would you like to purchase?",
                choices: ["* - I DON'T WANT TO PURCHASE ANYTHING", "1 - Car", "2 - Vase", "3 - Wrench", "4 - Motorcycle", "5 - Chair", "6 - Screwdriver", "7 - Math Textbook", "8 - Spiral Bound Notebook", "9 - Permanent Markers", "10 - Electric Guitar"],
                name: "productChoiceName"
            }
        ]).then(function (answer) {
            let productChoiceName = answer.productChoiceName;
            if (answer.productChoiceName === "* - I DON'T WANT TO PURCHASE ANYTHING") {
                console.log("");
                process.exit();
            } else {
                inquirer
                    .prompt([
                        {
                            type: "list",
                            message: "How many units of this product would you like to buy?",
                            choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "More than 10"],
                            name: "productChoiceQuantity"
                        }
                    ])
                    .then(function (answer) {
                        try {
                            const arrayOfProductChoice = (productChoiceName).split(" - ");
                            const idOfProductChoice = arrayOfProductChoice[0];
                            connection.query(
                                `SELECT * FROM products WHERE id = ${idOfProductChoice}`,
                                function queryOne(err, res) {
                                    if (err) throw err;
                                    const queryItemName = res[0].product_name;
                                    let queryItemQuantity = res[0].stock_quantity;
                                    const queryItemCost = res[0].price;
                                    if (answer.productChoiceQuantity === "1") {
                                        console.log(`
======================================================
Processing purchase order for ${answer.productChoiceQuantity} ${queryItemName}
======================================================`);
                                    } else {
                                        console.log(`
======================================================
Processing purchase order for ${answer.productChoiceQuantity} ${queryItemName}s
======================================================`);
                                    }
                                    if (answer.productChoiceQuantity > queryItemQuantity) {
                                        const quantityDifference = (answer.productChoiceQuantity - queryItemQuantity);
                                        console.log(`
    Insufficient Quantity!
------------------------------
You have ordered ${quantityDifference} too many.
We have ${queryItemQuantity} left in stock.
Be sure to order less than the total left in stock.
`);
                                        inquirer
                                            .prompt([
                                                {
                                                    type: "confirm",
                                                    message: "Would you still like to make a purchase?",
                                                    name: "choicePurchase"
                                                }
                                            ])
                                            .then(function (answer) {
                                                if (answer.choicePurchase === true) {
                                                    runPrompt();
                                                } else {
                                                    console.log("");
                                                    process.exit();
                                                }
                                            })
                                    } else {
                                        const newQuantity = queryItemQuantity - answer.productChoiceQuantity;
                                        const totalOrderCost = queryItemCost * answer.productChoiceQuantity;
                                        if (newQuantity === 1) {
                                            console.log(`\n${queryItemName} stock leftover proceeding your purchase: ${newQuantity} unit`);
                                        } else {
                                            console.log(`\n${queryItemName} stock leftover proceeding your purchase: ${newQuantity} units`);
                                        }
                                        connection.query(
                                            `UPDATE products SET stock_quantity = ${newQuantity} WHERE id = ${idOfProductChoice}`,
                                            function (err, res) {
                                                if (err) {
                                                    throw err;
                                                } else if (answer.productChoiceQuantity === "1") {
                                                    console.log(`\nYou have successfully purchased your item!`);
                                                    console.log(`\nThe total cost of your order was $${totalOrderCost}.\n`);
                                                } else {
                                                    console.log(`\nYou have successfully purchased your items!`);
                                                    console.log(`\nThe total cost of your order was $${totalOrderCost}.\n`);
                                                }
                                                inquirer
                                                    .prompt([
                                                        {
                                                            type: "confirm",
                                                            message: "Would you like to make another purchase?",
                                                            name: "choicePurchase"
                                                        }
                                                    ])
                                                    .then(function (answer) {
                                                        if (answer.choicePurchase === true) {
                                                            runPrompt();
                                                        } else {
                                                            console.log("");
                                                            process.exit();
                                                        }
                                                    })
                                            });
                                    }
                                });
                        } catch (err) {
                            console.log(err);
                        }
                    });
            }
        });
}