// Product - a plain data object describing an item that can be added to
// the cart. Instances are assembled through ProductBuilder rather than
// constructed directly, so callers never have to remember field order.
class Product {
  constructor({ name, price, category, description, tags }) {
    this.name = name;
    this.price = price;
    this.category = category;
    this.description = description;
    this.tags = tags;
  }
}

    module.exports = Product;
