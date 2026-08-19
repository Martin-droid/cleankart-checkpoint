// Shopping Cart - v1 (intentionally messy starting point)
// This is the "before" version: bad naming, magic numbers, duplication,
// global mutable state and no separation of concerns.

var c = [];
var d = 0;

function addP(n, p, q) {
for (var i = 0; i < c.length; i++) {
if (c[i].n == n) {
c[i].q = c[i].q + q;
return;
}
}
var obj = {};
obj.n = n;
obj.p = p;
obj.q = q;
c.push(obj);
}

function rem(n) {
var newC = [];
for (var i = 0; i < c.length; i++) {
if (c[i].n != n) {
newC.push(c[i]);
}
}
c = newC;
}

function calc() {
var t = 0;
for (var i = 0; i < c.length; i++) {
t = t + c[i].p * c[i].q;
}
if (d == 1) {
t = t - t * 0.1;
} else if (d == 2) {
t = t - t * 0.2;
} else if (d == 3) {
t = t - 5;
}
return t;
}

function show() {
var s = "";
for (var i = 0; i < c.length; i++) {
s = s + c[i].n + " x" + c[i].q + " = $" + (c[i].p * c[i].q) + "\n";
}
s = s + "Total: $" + calc();
console.log(s);
}

function setD(type) {
d = type;
}

addP("Shirt", 20, 2);
addP("Shoes", 50, 1);
addP("Shirt", 20, 1);
setD(1);
show();

module.exports = { addP, rem, calc, show, setD };
