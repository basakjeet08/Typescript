// Defining the interface
interface Product {
  id: number;
  name: string;
  price: number;
  quantityInStock: number;
}

// Defining the type alias
type Inventory = {
  products: Product[];
};

// This function fetches the product from the inventory
function findProductById(
  inventory: Inventory,
  productId: number
): Product | undefined {
  for (const product of inventory.products) {
    if (product.id === productId) {
      return product;
    }
  }
  return undefined;
}

// Function to add the product
function addProduct(
  inventory: Inventory,
  product: Product
): Inventory | undefined {
  // Finding the product if already present in the inventory
  const savedProduct = findProductById(inventory, product.id);

  // Checking if the product is already in the inventory
  if (savedProduct) {
    console.log("Product already saved !!");
  } else {
    inventory.products.push(product);
    return inventory;
  }
}

// This function updates the stock
function updateStock(
  inventory: Inventory,
  productId: number,
  quantityChange: number
): Inventory | undefined {
  // Finding the saved product
  const savedProduct = findProductById(inventory, productId);

  // Updating the product items
  if (savedProduct) {
    savedProduct.quantityInStock += quantityChange;
    savedProduct.quantityInStock = Math.max(savedProduct.quantityInStock, 0);
  } else {
    return inventory;
  }
}

// This function fetches the total inventory value
function getTotalIOnventoryValue(inventory: Inventory): number {
  let value = 0;

  // Calculating the value
  inventory.products.forEach(
    (product) => (value += product.price * product.quantityInStock)
  );

  return value;
}

// Creating the inventory and the product
const inventory: Inventory = { products: [] };
const product1: Product = {
  id: 1,
  name: "Hp Laptop",
  price: 50000,
  quantityInStock: 10,
};

const product2: Product = {
  id: 2,
  name: "Apple I Phone",
  price: 70000,
  quantityInStock: 10,
};

const product3: Product = {
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

export {};
