//Comments by Gemini

// ==========================================
// DATA SETUP
// ==========================================

// 1. Array of Objects: Represents the raw sales data.
// Note: The numeric values are currently strings ("2", "999"), 
// but JavaScript will automatically convert them during multiplication.
sales = [
  {
    item: "Mouse",
    quantity: "2",
    price: "999"
  },
  {
    item: "Keyboard",
    quantity: "5",
    price: "2234"
  },
  {
    item: "Monitor",
    quantity: "1",
    price: "8999"
  }
]

// ==========================================
// FUNCTION DEFINITIONS
// ==========================================

/**
 * Calculates the total revenue from a sales array.
 * Uses the .reduce() method to condense the array into a single number.
 */
function calculateTotalSales(array) {
    // .reduce() takes two arguments: a callback and an initial value (0).
    // 'acc' (accumulator) stores the running total.
    // 'curr' (current item) represents the object currently being processed.
    total = array.reduce((acc, curr) => {
        // Multiply quantity by price for the current item and add to accumulator
        return acc + (curr.quantity * curr.price)
    }, 0)
    
    return total; // Returns the final sum
}

/**
 * Generates and prints a formatted receipt.
 * Uses a standard 'for' loop (typically used when you need the index 'i').
 */
function generateReceipt(array) {
    console.log("Receipt: \n-------------------");
    
    // Standard Loop: Iterates from index 0 to the end of the array
    for (let i = 0; i < array.length; i++) {
        // Accesses data using the index [i]
        // Note: It calculates the line total (quantity * price) directly inside the template literal
        console.log(`${sales[i].item} - Quantity: ${sales[i].quantity}, Price: P${sales[i].price}, Total: P${sales[i].quantity * sales[i].price}`);
    }
    
    // Calls the calculateTotalSales function to get the final number for the bottom of the receipt
    console.log(`------------------- \nGrand Total: P${calculateTotalSales(array)}`);
}

/**
 * Validates a list of passwords against specific security requirements.
 * Uses Rest Parameters (...pwd) to accept ANY number of arguments as an array.
 */
function validatePasswords(...pwd) {
    // Regex Pattern:
    // ^          : Start of string
    // [a-zA-Z0-9]: Allowed chars (Alphanumeric only, no special chars)
    // {8,20}     : Length must be between 8 and 20 characters
    // $          : End of string
    const pattern = /^[a-zA-Z0-9]{8,20}$/;

    // Loop Type: for...of
    // Best for arrays when you need the VALUE ('password'), not the index.
    for (password of pwd) {
        // .test() checks if the current password matches the Regex pattern
        if (!pattern.test(password)) {
            console.log(`${password} is invalid.`);
        }
        else {
            console.log(`${password} is valid.`);
        }
    }
}

// Data for the inventory check
inventory = [
    { product: "Laptop", stock: 10 },
    { product: "Tablet", stock: 0 },
    { product: "Smartphone", stock: 15 }
]

/**
 * Checks stock levels for inventory items.
 * Uses a 'for...of' loop to iterate through objects in the array.
 */
function checkInStock (array) {
    // Iterates through every object in the 'inventory' array
    for (item of array) {
        // Logical check: Is the stock number greater than 0?
        if (item.stock > 0) {
            console.log(`${item.product} is in stock.`);
        }
        else {
            console.log(`${item.product} is out of stock.`);
        }
    }
}

// ==========================================
// EXECUTION
// ==========================================

// 1. Calculate total (Note: This returns a value but doesn't print it directly here)
calculateTotalSales(sales);

// 2. Generate the full receipt (Prints to console)
generateReceipt(sales);

// 3. Validate a mix of good and bad passwords
// Arguments are passed individually, but '...pwd' collects them into an array
validatePasswords("password123", "pass", "validPASS99", "invalid@pass!", "Password123", "short", "ValidPass123", "too_long_password_example", "12345");

// 4. Check inventory status
checkInStock(inventory);