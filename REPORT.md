# Summary Report - CleanKart Refactor & Iteration

## Overview

This project takes a deliberately messy Shopping Cart implementation and
iteratively improves it in three passes, tracked as three folders in this
repository: v1_messy, v2_refactored, and v3_patterns. Each iteration
is runnable on its own (node v1_messy/shoppingCart.js, etc.) and produces
equivalent results, so the improvements can be verified at every step.

## Iteration 1 - v1_messy (starting point)

This is the intentionally bad baseline. It uses a global mutable array
(c) and a global discount flag (d), single-letter variable names
(n, p, q, t, s), a long calc() function mixing subtotal math
with discount logic, and a show() function that rebuilds totals with
duplicated multiplication logic instead of reusing calc(). Discount
types are represented as unexplained magic numbers (1, 2, 3).

## Iteration 2 - v2_refactored (refactoring techniques applied)

### What changed and why

- Renaming: every cryptic variable was renamed to something
self-documenting (c to #items, d to #discountType, n/p/q to
name/price/quantity). Code should be readable without a mental
lookup table.
- Extracting methods: calc() was split into #calculateSubtotal() and
#applyDiscount(), and show() was renamed to printReceipt() and made
to call calculateTotal() instead of recomputing the total inline. This
removed the duplicated total-calculation logic between the two functions.
- Removing magic numbers: discount codes 1/2/3 became descriptive
strings ("percentage10", "percentage20", "flat5"), so a reader does
not need to trace through calc() to know what a discount type means.
- Encapsulation: the two global variables became private class fields
(#items, #discountType) on a ShoppingCart class. Nothing outside the
class can now read or mutate the cart's internal state directly.
- Removing dead code: the unused rem()/removeItem() duplication
path from the messy version's inconsistent naming was cleaned up into a
single, consistently-named removeItem() method.

### How clean code principles were followed

Each function now does one thing (single responsibility), names describe
intent rather than requiring inline comments to explain them, and the
class's internal representation is hidden behind a small public API
(addItem, removeItem, setDiscount, calculateTotal, printReceipt).

## Iteration 3 - v3_patterns (design patterns integrated)

### What changed and why

Iteration 2 removed duplication and improved naming, but the discount
logic was still a hard-coded switch statement, item construction was
still a bare object literal, and there was no way to react to cart events
without modifying ShoppingCart itself. Iteration 3 addresses each of
these with a design pattern:

- Strategy - discount calculation. DiscountStrategy defines a single
apply(subtotal) method; PercentageDiscount, FlatDiscount, and
NoDiscount each implement it differently. ShoppingCart no longer
knows how a discount is computed - it just calls
this.#discountStrategy.apply(subtotal). New discount rules can be added
by writing a new strategy class, with zero changes to ShoppingCart.
- Observer - price-drop notifications. PriceObserver defines
update(product, oldPrice, newPrice); ConsoleUserNotifier implements
it to log a message. ShoppingCart.subscribe() lets any number of
observers register, and updatePrice() notifies all of them when a
price drops. The cart does not need to know who is listening or how they
react - it only publishes the event.
- Builder - Product creation. ProductBuilder replaces a long,
error-prone constructor call with a fluent, readable chain
(.setName().setPrice().setCategory().addTag().build()), validates that
required fields are present, and defaults optional fields like
category and tags. ShoppingCart now stores Product instances
instead of ad hoc object literals.

### How patterns improved the design

Each pattern removes a different kind of coupling: Strategy decouples the
cart from specific discount rules, Observer decouples the cart from
whoever needs to react to price changes, and Builder decouples object
construction from the class that owns the data. The result is a
ShoppingCart that is smaller, easier to test in isolation, and open to
new discount rules, new listeners, or new product fields without editing
its existing code - the same "modular, flexible, and scalable" goals
described in the design-patterns material for this module.

## Tracking iterations

Each iteration lives in its own folder (v1_messy, v2_refactored,
v3_patterns) and is preserved in full rather than overwritten, so the
progression from messy code to a pattern-based design can be compared
side by side. Commit history on this repository also reflects each step
of the refactor in order.
