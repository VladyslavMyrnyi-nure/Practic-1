let price = 500;
let discount = 50;

let finalPrice = price - discount;

console.log("Початкова ціна: " + price + " грн");
console.log("Знижка: " + discount + " грн");
console.log("Ціна до сплати: " + finalPrice + " грн");

if (finalPrice < 1000) {
    console.log("Доставка буде платною.");
} else {
    console.log("Ви отримали безкоштовну доставку!");
}