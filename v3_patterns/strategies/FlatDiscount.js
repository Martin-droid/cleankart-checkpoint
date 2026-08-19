const DiscountStrategy = require("./DiscountStrategy");

class FlatDiscount extends DiscountStrategy {
constructor(amount) {
super();
this.amount = amount;
}

apply(subtotal) {
return Math.max(0, subtotal - this.amount);
}
}

module.exports = FlatDiscount;
