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
                message: "What product ID would you like to purchase?",
                choices: ["* - I DON'T WANT TO PURCHASE ANYTHING", "1 - Car", "2 - Vase", "3 - Wrench", "4 - Motorcycle", "5 - Chair", "6 - Screwdriver", "7 - Math Textbook", "8 - Spiral Bound Notebook", "9 - Permanent Markers", "10 - Electric Guitar"],
                name: "productChoiceName"
            }
        ]).then(function (answer) {
            let productChoiceName = answer.productChoiceName;
            if (answer.productChoiceName === "* - I DON'T WANT TO PURCHASE ANYTHING") {
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
                                    if (answer.productChoiceQuantity === 1) {
                                        console.log(`\nProcessing purchase order for ${answer.productChoiceQuantity} ${queryItemName}`);
                                    } else {
                                        console.log(`\nProcessing purchase order for ${answer.productChoiceQuantity} ${queryItemName}s`);
                                    }

                                    // return queryItemQuantity;
                                    // return [queryItemQuantity, queryItemCost, queryItemName]
                                    if (answer.productChoiceQuantity > queryItemQuantity) {
                                        const quantityDifference = (answer.productChoiceQuantity - queryItemQuantity);
                                        console.log(`
===========================================
Insufficient Quantity!

You have ordered ${quantityDifference} too many.
We have ${queryItemQuantity} left in stock.
Be sure to order less than the total stock.
===========================================
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
                                        const totalOrderCost = queryItemCost * queryItemQuantity;
                                        console.log(`\nChecking/testing new quantity value: ${newQuantity}`);
                                        connection.query(
                                            `UPDATE products SET stock_quantity = ${newQuantity} WHERE id = ${idOfProductChoice}`,
                                            function (err, res) {
                                                if (err) {
                                                    throw err;
                                                } else if (answer.productChoiceQuantity === 1) {
                                                    console.log("You have successfully purchased your item!");
                                                    console.log(`Your total cost for this order was $${totalOrderCost}`);
                                                } else if (answer.productChoiceQuantity > 1) {
                                                    console.log("You have successfully purchased your items!");
                                                    console.log(`Your total cost for this order was $${totalOrderCost}`);
                                                }
                                            });
                                        runPrompt();
                                    }
                                });
                            // let queryItemQuantity = queryOne();
                        } catch (err) {
                            console.log(err);
                        }
                    });
            }
        });
}