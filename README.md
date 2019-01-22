# **Store-Stock-Item-Grabber_MySQL-Node**






## Purpose Of App:
This app provides an assortment of items from a MySQL database in which customers can purchase through the node.js package "Inquirer." Depending on what item is chosen and how many units of that item are purchased, the app will present the total cost accordingly as well as give the customer the total inventory leftover for that item proceeding the purchase.

---

### Video Walk Through:
Click [here](https://www.youtube.com/watch?v=uQq6YGy_8hs) for a video walk-through of my Store-Stock-Item-Grabber app in Node.js:

---

### Text Walk Through:
The Store Stock Item Grabber node.js app pairs with a MySQL database that is set up with variety of items showing product name, cost, and the number of items left in stock (See sample table from video explanation below).

The MySQL and Inquirer npm packages are utilized to make a connection with the database and use Inquirer's prompt tool to ask the user question regarding which item and how many of that item they'd like to receive. If there are not enough of that particular item, the node.js function will notify the user that there isn't enough of that to fulfill their request and only X amount of such item are left.

Whether you asked for too many or successfully made a purchase, the app will continue to prompt you with the question: "Would you like to make another purchase?" Not only can the user exit the app under this prompt by answering "No," but upon receiving the prompt regarding which item one would like to purchase, the user can select "I DON'T TO PURCHASE ANYTHING."

---

### Data Table Reference:

Product | Department | Price | Inventory
:---: | :---: | :---: | :---:
Car | Transportation | $20,000 | 3
Vase | Domestic | $70 | 7
Wrench | Hardware | $10 | 5
Motorcycle | Transportation | $13,000 | 3
Chair | Domestic | $35 | 8
Screwdriver | Hardware | $6 | 10
Math Textbook | School | $50 | 9
Spiral Bound Notebook | School | $10 | 12
Permanent Marker | School | $5 | 15
Electric Guitar | School | $200 | 50

---
