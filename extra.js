document.addEventListener('DOMContentLoaded', function() {
    const items = {
        "Hotdog": { price: 4.65, quantity: 0 },
        "Fries": { price: 3.75, quantity: 0 },
        "Soda": { price: 1.89, quantity: 0 }
    };
    const TAX_RATE = 0.0625; // Massachusetts meals tax rate

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

    Object.keys(items).forEach(item => {
        items[item].quantity = parseInt(prompt(`How many ${item.toLowerCase()} do you want?`), 10) || 0;
    });

    let subtotal = Object.keys(items).reduce((acc, item) => acc + (items[item].quantity * items[item].price), 0);
    let discount = (subtotal >= 25) ? subtotal * 0.1 : 0;
    subtotal -= discount;
    let tax = subtotal * TAX_RATE;
    let total = subtotal + tax;

    let orderDetailsHTML = Object.keys(items).map(item => `<p>${item}s Ordered: ${items[item].quantity} ($${showMoney(items[item].quantity * items[item].price)})</p>`).join('');
    orderDetailsHTML += `
        <p>Subtotal (Before Discount): $${showMoney(subtotal + discount)}</p>
        <p>Discount: $${showMoney(discount)}</p>
        <p>Subtotal (After Discount): $${showMoney(subtotal)}</p>
        <p>Tax: $${showMoney(tax)}</p>
        <p>Total: $${showMoney(total)}</p>
    `;

    document.getElementById('orderDetails').innerHTML = orderDetailsHTML;
});
