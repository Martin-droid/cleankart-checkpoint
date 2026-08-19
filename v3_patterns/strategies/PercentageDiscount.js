const DiscountStrategy = require("./DiscountStrategy");

class PercentageDiscount extends DiscountStrategy {
constructor(percentage) {
super();
this.percentage = percentage;
}

apply(subtotal) {
return subtotal - subtotal * (this.percentage / 100);
}
}

module.exports = PercentageDiscount;
