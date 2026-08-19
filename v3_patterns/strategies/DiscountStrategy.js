/**
* DiscountStrategy - abstract "interface" for the Strategy Pattern.
* Concrete strategies implement apply(subtotal) and can be swapped into
* the cart at runtime without the cart knowing which discount rule it's
* using.
*/
class DiscountStrategy {
apply(subtotal) {
throw new Error(`${this.constructor.name} must implement apply()`);
}
}

module.exports = DiscountStrategy;
