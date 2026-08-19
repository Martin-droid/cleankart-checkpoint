const DiscountStrategy = require("./DiscountStrategy");

class NoDiscount extends DiscountStrategy {
apply(subtotal) {
return subtotal;
}
}

module.exports = NoDiscount;
