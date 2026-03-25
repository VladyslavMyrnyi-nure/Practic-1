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