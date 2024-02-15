const itemPrices = {
    "Hotdog": 4.65,
    "Fries": 3.75,
    "Soda": 1.89
};

// Initializes quantities for each item
let itemQuantities = {
    "Hotdog": 0,
    "Fries": 0,
    "Soda": 0
};

// Function to format currency values
function showMoney(value) {
    let rounded = Math.round(value * 100) / 100;
    let valueStr = rounded.toString();
    if (valueStr.indexOf('.') === -1) {
        valueStr += ".00";
    } else {
        let parts = valueStr.split('.');
        if (parts[1].length === 1) {
            valueStr += "0";
        }
    }
    return valueStr;
}

// Loop to get quantities from the user
for (let item in itemQuantities) {
    let quantity = parseInt(prompt(`How many ${item.toLowerCase()} do you want?`), 10) || 0;
    itemQuantities[item] = quantity;
}

// Calculate subtotal using a loop
let subtotal = 0;
for (let item in itemQuantities) {
    subtotal += itemQuantities[item] * itemPrices[item];
}

const TAX_RATE = 0.0625;
let discount = (subtotal >= 25) ? subtotal * 0.1 : 0;
subtotal -= discount;
let tax = subtotal * TAX_RATE;
let total = subtotal + tax;

// Displaying the order details
document.getElementById('orderDetails').innerHTML = `
    ${Object.keys(itemQuantities).map(item => `<p>${item} Ordered: ${itemQuantities[item]} ($${showMoney(itemQuantities[item] * itemPrices[item])})</p>`).join('')}
    <p>Subtotal (Before Discount): $${showMoney(subtotal + discount)}</p>
    <p>Discount: $${showMoney(discount)}</p>
    <p>Subtotal (After Discount): $${showMoney(subtotal)}</p>
    <p>Tax: $${showMoney(tax)}</p>
    <p>Total: $${showMoney(total)}</p>
`;

