const inquirer = require("inquirer");
const mysql = require("mysql");

console.log(`=================================
Your action is being processed...
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
    else console.log(`Your connection to port #${connection.config.port} was successful!`);
    runPrompt();
});

function runPrompt() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "What product ID would you like to purchase?",
                choices: [`I DON'T WANT TO PURCHASE ANYTHING`, "1: Car", "2: Vase", "3: Wrench", "4: Motorcycle", "5: Chair", "6: Screwdriver", "7: Math Textbook", "8: Spiral Bound Notebook", "9: Permanent Markers", "10: Electric Guitar"],
                name: "productChoiceName"
            }
        ]).then(function (answer) {
            let productChoiceName = answer.productChoiceName;
            if (answer.productChoiceName === "I DON'T WANT TO PURCHASE ANYTHING") {
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
                            console.log(productChoiceName);
                            const arrayOfProductChoice = (productChoiceName).split(": ");
                            const idOfProductChoice = arrayOfProductChoice[0];
                            console.log(idOfProductChoice);
                            connection.query(
                                `SELECT * FROM products WHERE id = ${idOfProductChoice}`,
                                function queryOne(err, res) {
                                    if (err) throw err;
                                    const queryItemName = res[0].product_name;
                                    let queryItemQuantity = res[0].stock_quantity;
                                    const queryItemCost = res[0].price;
                                    if (answer.productChoiceQuantity === 1) {
                                        console.log(`Processing purchase order for * ${answer.productChoiceQuantity} ${queryItemName} *`);
                                    } else {
                                        console.log(`Processing purchase order for * ${answer.productChoiceQuantity} ${queryItemName}s *`);
                                    }
                                    return queryItemQuantity;
                                    // return [queryItemQuantity, queryItemCost, queryItemName]
                                });
                            let queryItemQuantity = queryOne();
                            if (answer.productChoiceQuantity > queryItemQuantity) {
                                const quantityDifference = (answer.productChoiceQuantity - queryItemQuantity);
                                console.log(`
Insufficient Quantity
---------------------
You have ordered ${quantityDifference} too many.
We only have ${queryItemQuantity} in stock.
Please try again, ordering less than the total quantity in stock.
---------------------
`);
                                runPrompt();
                            } else {
                                const newQuantity = queryItemQuantity - answer.productChoiceQuantity;
                                const totalOrderCost = queryItemCost * queryItemQuantity;
                                console.log(`Checking/testing new quantity value: ${newQuantity}`);
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
                            }
                        } catch (err) {
                            console.log(err);
                        }
                    });
            }
        });
}