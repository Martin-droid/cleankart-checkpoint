// Shopping Cart - v2 (refactored)
// Iteration 2: applied refactoring techniques to the v1 messy version.
//
// Changes made in this iteration:
//  - Renamed all cryptic variables (c, d, n, p, q, t, s) to descriptive names.
//  - Extracted long functions into small, single-purpose methods.
//  - Removed duplication between calc()/show() by having show() reuse
//    calculateTotal() instead of recomputing totals inline.
//  - Replaced magic discount numbers (0, 1, 2, 3) with descriptive strings.
//  - Replaced global mutable state (var c, var d) with encapsulated
//    private class fields, so nothing outside the class can corrupt it.
//  - Removed dead/unused code paths.

class ShoppingCart {
#items = [];
#discountType = "none";

addItem(name, price, quantity) {
const existingItem = this.#findItem(name);
if (existingItem) {
existingItem.quantity += quantity;
return;
}
this.#items.push({ name, price, quantity });
}

removeItem(name) {
this.#items = this.#items.filter((item) => item.name !== name);
}

setDiscount(discountType) {
this.#discountType = discountType;
}

calculateTotal() {
const subtotal = this.#calculateSubtotal();
return this.#applyDiscount(subtotal);
}

printReceipt() {
const lines = this.#items.map(
(item) => `${item.name} x${item.quantity} = $${(item.price * item.quantity).toFixed(2)}`
);
lines.push(`Total: $${this.calculateTotal().toFixed(2)}`);
console.log(lines.join("\n"));
}

#findItem(name) {
return this.#items.find((item) => item.name === name);
}

#calculateSubtotal() {
return this.#items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

#applyDiscount(subtotal) {
switch (this.#discountType) {
case "percentage10":
return subtotal - subtotal * 0.1;
case "percentage20":
return subtotal - subtotal * 0.2;
case "flat5":
return subtotal - 5;
default:
return subtotal;
}
}
}

// --- Demo / manual checks (mirrors the v1 demo so outputs are comparable) --
const cart = new ShoppingCart();
cart.addItem("Shirt", 20, 2);
cart.addItem("Shoes", 50, 1);
cart.addItem("Shirt", 20, 1);
cart.setDiscount("percentage10");
cart.printReceipt();

module.exports = ShoppingCart;
