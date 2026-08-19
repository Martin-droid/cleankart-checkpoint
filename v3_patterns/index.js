const ShoppingCart = require("./ShoppingCart");
const ProductBuilder = require("./builders/ProductBuilder");
const PercentageDiscount = require("./strategies/PercentageDiscount");
const ConsoleUserNotifier = require("./observers/ConsoleUserNotifier");

// Builder Pattern in action: assemble products without a long constructor.
const shirt = new ProductBuilder()
.setName("Shirt")
.setPrice(20)
.setCategory("Apparel")
.addTag("cotton")
.build();

const shoes = new ProductBuilder()
.setName("Shoes")
.setPrice(50)
.setCategory("Footwear")
.build();

const cart = new ShoppingCart();

// Observer Pattern in action: subscribe to price-drop notifications.
cart.subscribe(new ConsoleUserNotifier());

cart.addItem(shirt, 2);
cart.addItem(shoes, 1);

// Strategy Pattern in action: plug in a discount rule at runtime.
cart.setDiscountStrategy(new PercentageDiscount(10));
cart.printReceipt();

// Triggers the Observer notification since the new price is lower.
cart.updatePrice("Shoes", 40);
cart.printReceipt();
