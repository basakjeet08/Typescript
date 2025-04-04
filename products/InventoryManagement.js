"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// This function fetches the product from the inventory
function findProductById(inventory, productId) {
    for (var _i = 0, _a = inventory.products; _i < _a.length; _i++) {
        var product = _a[_i];
        if (product.id === productId) {
            return product;
        }
    }
    return undefined;
}
// Function to add the product
function addProduct(inventory, product) {
    // Finding the product if already present in the inventory
    var savedProduct = findProductById(inventory, product.id);
    // Checking if the product is already in the inventory
    if (savedProduct) {
        console.log("Product already saved !!");
    }
    else {
        inventory.products.push(product);
        return inventory;
    }
}
// This function updates the stock
function updateStock(inventory, productId, quantityChange) {
    // Finding the saved product
    var savedProduct = findProductById(inventory, productId);
    // Updating the product items
    if (savedProduct) {
        savedProduct.quantityInStock += quantityChange;
        savedProduct.quantityInStock = Math.max(savedProduct.quantityInStock, 0);
    }
    else {
        return inventory;
    }
}
// This function fetches the total inventory value
function getTotalIOnventoryValue(inventory) {
    var value = 0;
    // Calculating the value
    inventory.products.forEach(function (product) { return (value += product.price * product.quantityInStock); });
    return value;
}
// Creating the inventory and the product
var inventory = { products: [] };
var product1 = {
    id: 1,
    name: "Hp Laptop",
    price: 50000,
    quantityInStock: 10,
};
var product2 = {
    id: 2,
    name: "Apple I Phone",
    price: 70000,
    quantityInStock: 10,
};
var product3 = {
    id: 3,
    name: "80 Hazaar k Shoes",
    price: 80000,
    quantityInStock: 10,
};
addProduct(inventory, product1);
addProduct(inventory, product2);
addProduct(inventory, product3);
// Would Log the error
addProduct(inventory, product1);
// Updating the product
updateStock(inventory, 2, -5);
console.log(inventory);
console.log(getTotalIOnventoryValue(inventory));
