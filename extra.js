document.addEventListener('DOMContentLoaded', function() {
    const prices = {
        Hotdog: 4.65,
        Fries: 3.75,
        Soda: 1.89
    };
    const TAX_RATE = 0.0625;
    let quantities = {};

    for (let item in prices) {
        quantities[item] = parseInt(prompt(`How many ${item}s do you want?`), 10) || 0;
    }

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

    let subtotal = 0;
    for (let item in prices) {
        subtotal += quantities[item] * prices[item];
    }

    let discount = (subtotal >= 25) ? subtotal * 0.1 : 0;
    subtotal -= discount;
    let tax = subtotal * TAX_RATE;
    let total = subtotal + tax;

    let orderDetailsHtml = '';
    for (let item in prices) {
        orderDetailsHtml += `<p>${item}s Ordered: ${quantities[item]} ($${showMoney(quantities[item] * prices[item])})</p>`;
    }

    orderDetailsHtml += `
        <p>Subtotal (Before Discount): $${showMoney(subtotal + discount)}</p>
        <p>Discount: $${showMoney(discount)}</p>
        <p>Subtotal (After Discount): $${showMoney(subtotal)}</p>
        <p>Tax: $${showMoney(tax)}</p>
        <p>Total: $${showMoney(total)}</p>
    `;

    document.getElementById('orderDetails').innerHTML = orderDetailsHtml;
});


