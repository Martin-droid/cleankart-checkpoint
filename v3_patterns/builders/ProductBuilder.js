const Product = require("../Product");

/**
* ProductBuilder - Builder Pattern.
*
* Product objects can have several optional fields (category, description,
* tags) alongside required ones (name, price). A long constructor with many
* optional parameters is error-prone. The builder lets callers set only the
* fields they care about, in any order, through a readable chained API, and
* validates the object before it is ever created.
*/
class ProductBuilder {
#name;
#price;
#category = "General";
#description = "";
#tags = [];

setName(name) {
this.#name = name;
return this;
}

setPrice(price) {
this.#price = price;
return this;
}

setCategory(category) {
this.#category = category;
return this;
}

setDescription(description) {
this.#description = description;
return this;
}

addTag(tag) {
this.#tags.push(tag);
return this;
}

build() {
if (!this.#name || this.#price == null) {
throw new Error("Product requires at least a name and a price");
}
return new Product({
name: this.#name,
price: this.#price,
category: this.#category,
description: this.#description,
tags: this.#tags,
});
}
}

module.exports = ProductBuilder;
