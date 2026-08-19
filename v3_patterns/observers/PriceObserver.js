/**
* PriceObserver - abstract "interface" for the Observer Pattern.
* Concrete observers implement update(product, oldPrice, newPrice) and get
* notified whenever the cart records a price drop on an item they're
* watching.
*/
class PriceObserver {
  update(product, oldPrice, newPrice) {
    throw new Error(`${this.constructor.name} must implement update()`);
                      }
                    }

                    module.exports = PriceObserver;
