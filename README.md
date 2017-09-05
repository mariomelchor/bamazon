# bamazon

## Running the App

You can run this app by using any of the following commands. Each command has a different set of task for the user.

```
node bamazon-customer.js
```

```
node bamazon-manager.js
```

```
node bamazon-supervisor.js
```

### Bamazon Customer

Running `node bamazon-customer.js` will display a list of products for purchase allow you to select a product It will then prompt you for a quantity and display the Total Cost of your purchase.

![alt text](screenshots/customer/customer-screenshot-1.jpg "Screenshot Products for Purchase")

![alt text](screenshots/customer/customer-screenshot-2.jpg "Screenshot Quantity")

![alt text](screenshots/customer/customer-screenshot-3.jpg "Screenshot Total Cost of Purchase")

### Bamazon Manager

Running `node bamazon-manager.js` will display 4 options View Products for Sale, View Low Inventory, Add to Inventory, and Add New Product

![alt text](screenshots/manager/manager-screenshot-task.jpg "Screenshot Manager Task")

### View Products for Sale

It will display a list of all products for sale with the Product ID, Product Title, Product Price, Product Department, and Product Quantity

![alt text](screenshots/manager/for-sale/manager-screenshot-1.jpg "Screenshot Products for Sale")

### View Low Inventory

It will display a list of all products that have an inventory of less than 10

![alt text](screenshots/manager/low-inventory/manager-screenshot-1.jpg "Screenshot Products Low Inventory")

### Add to Inventory

It will display a list of all products and allow you to select a product. Once a product is selected it will prompt you to add a number of units to add and then display how much inventory this product now has

![alt text](screenshots/manager/add-inventory/manager-screenshot-1.jpg "Screenshot Select Product")

![alt text](screenshots/manager/add-inventory/manager-screenshot-2.jpg "Screenshot Units to add")

![alt text](screenshots/manager/add-inventory/manager-screenshot-3.jpg "Screenshot Total Inventory")

### Add Product

This will prompt you to Add a product. It will ask you for a product name prompt you for what category it belongs to what the price is and how many are in stock at the end it will confirm that the product has been added.

![alt text](screenshots/manager/add-product/manager-screenshot-1.jpg "Screenshot Product Name")

![alt text](screenshots/manager/add-product/manager-screenshot-2.jpg "Screenshot Product Name")

![alt text](screenshots/manager/add-product/manager-screenshot-3.jpg "Screenshot Product Category")

![alt text](screenshots/manager/add-product/manager-screenshot-4.jpg "Screenshot Product Price")

![alt text](screenshots/manager/add-product/manager-screenshot-5.jpg "Screenshot Product Stock")

![alt text](screenshots/manager/add-product/manager-screenshot-6.jpg "Screenshot Product Added")

## Bamazon Supervisor

Running `node bamazon-supervisor.js` will display 2 options View Product Sales by Department, and Create New Department

![alt text](screenshots/supervisor/supervisor-screenshot-task.jpg "Screenshot Supervisor Task")

### View Product Sales by Department

This will display a table that shows Product Sales by Department

![alt text](screenshots/supervisor/sales-department/supervisor-screenshot-1.jpg "Screenshot Sales by Department")


### Create New Department

This will allow you to create a New Department it will prompt you for a Department Name and Overhead Costs it will then confirm if the Department was created.

![alt text](screenshots/supervisor/create-department/supervisor-screenshot-1.jpg "Screenshot Create New Department")

![alt text](screenshots/supervisor/create-department/supervisor-screenshot-2.jpg "Screenshot Department Overhead Costs")

![alt text](screenshots/supervisor/create-department/supervisor-screenshot-3.jpg "Screenshot Confirm New Department")