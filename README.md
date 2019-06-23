# **StoreStockItemGrabber**






## Purpose of App:
This app provides an assortment of items from a MySQL database in which customers can purchase through the node.js package "Inquirer." Depending on what item is chosen and how many units of that item are purchased, the app will present the total cost accordingly as well as give the customer the total inventory leftover for that item proceeding the purchase.

---

### Video Walk Through:
Click [here](https://www.youtube.com/watch?v=Vufq5RRxQYA&t) for a video walk-through of my Store-Stock-Item-Grabber app in Node.js:

---

### Text Walk Through:
The Store Stock Item Grabber node.js app pairs with a MySQL database, named "bamazon", which is set up with variety of items showing product name, cost, and the number of items left in stock (See the "Data Table Reference" below).

The MySQL and Inquirer npm packages are utilized in this app to make a connection with the "bamazon" database and uses Inquirer's prompt tool to ask the user questions regarding which item (as well as how many of that item) they'd like to receive. If there are not enough of the particular item being requested, the app will notify the user that 
    1. There aren't enough of that item to fulfill their request and
    2. That only X amount of such item are leftover.

Whether you asked for too many of a particular item and were denied, or you successfully made a purchase from the app, the Inquirer prompt tool will either follow up with "Would you like to make another purchase?" (if successful), or "Would you still like to make a purchase?" (if unsuccessful).

Not only can the user exit the app under this prompt by answering "No," but upon receiving the prompt regarding which item one would like to purchase, the user can also select "I DON'T TO PURCHASE ANYTHING" in order to exit the app.

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
