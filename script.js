// Обчислення фінальної ціни з урахуванням знижки
let price = 500;
let discount = 20;
let finalPrice = price - discount;

console.log("Початкова ціна: " + price + " грн");
console.log("Знижка: " + discount + " грн");
console.log("Ціна до сплату: " + finalPrice + " грн");

if (finalPrice < 1000) {
    console.log("Доставка буде платною.");
} else {
    console.log("Ви отримали безкоштовну доставку!");
}