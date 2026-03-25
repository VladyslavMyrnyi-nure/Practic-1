console.log("Hello, World!");

function hello() {
    console.log("Hello, World!");
}
hello();

function factorial(n) {
    if (n < 0) {
        return null;
    }
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * factorial(n - 1);
}
console.log(factorial(5));
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
