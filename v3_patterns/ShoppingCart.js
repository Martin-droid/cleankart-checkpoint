const NoDiscount = require("./strategies/NoDiscount");

/**
* ShoppingCart - v3 (patterns applied)
* Iteration 3: builds on the v2 refactor by integrating three design
* patterns instead of hard-coded logic:
*
*  - Strategy: discount calculation is delegated to a DiscountStrategy
*    instance instead of a switch statement, so new discount rules can be
*    added without touching this class.
*  - Observer: instead of the cart knowing how to notify users, any number
*    of PriceObserver instances can subscribe and are notified on price
*    drops.
*  - Builder: items added to the cart are Product instances assembled by
*    ProductBuilder (see builders/ProductBuilder.js and index.js), keeping
*    object construction out of this class entirely.
*/
class ShoppingCart {
  #items = [];
  #discountStrategy = new NoDiscount();
  #observers = [];

  addItem(product, quantity) {
    const existingItem = this.#items.find((item) => item.product.name === product.name);
    if (existingItem) {
      existingItem.quantity += quantity;
      return;
    }
      this.#items.push({ product, quantity });
  }

  removeItem(name) {
    this.#items = this.#items.filter((item) => item.product.name !== name);
  }

  setDiscountStrategy(strategy) {
    this.#discountStrategy = strategy;
  }

  subscribe(observer) {
    this.#observers.push(observer);
  }

  updatePrice(name, newPrice) {
    const item = this.#items.find((entry) => entry.product.name === name);
    if (!item) return;

    const oldPrice = item.product.price;
    item.product.price = newPrice;

    if (newPrice < oldPrice) {
      this.#notify(item.product, oldPrice, newPrice);
    }
  }

      calculateTotal() {
        const subtotal = this.#calculateSubtotal();
        return this.#discountStrategy.apply(subtotal);
      }

      printReceipt() {
        const lines = this.#items.map(
          (item) => `${item.product.name} x${item.quantity} = $${(item.product.price * item.quantity).toFixed(2)}`
        );
        lines.push(`Total: $${this.calculateTotal().toFixed(2)}`);
        console.log(lines.join("\n"));
      }

      #calculateSubtotal() {
        return this.#items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      }

      #notify(product, oldPrice, newPrice) {
        this.#observers.forEach((observer) => observer.update(product, oldPrice, newPrice));
      }
  }

      module.exports = ShoppingCart;
