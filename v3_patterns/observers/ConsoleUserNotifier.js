const PriceObserver = require("./PriceObserver");

class ConsoleUserNotifier extends PriceObserver {
  update(product, oldPrice, newPrice) {
    console.log(
      `Price drop! "${product.name}" is now $${newPrice.toFixed(2)} (was $${oldPrice.toFixed(2)}).`
    );
  }
}

  module.exports = ConsoleUserNotifier;
