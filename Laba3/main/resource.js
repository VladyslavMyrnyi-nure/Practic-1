class Resource {
    // Конструктор класу Resource: ініціалізує тип ресурсу та кількість з перевіркою коректності
    constructor(type, amount = 0) {
        if (typeof type !== "string" || type.trim() === "") {
            throw new Error("Invalid resource type");
        }

        if (typeof amount !== "number" || amount < 0) {
            throw new Error("Amount must be a non-negative number");
        }

        this.type = type;
        this.amount = amount;
    }

    // Метод додавання ресурсу: збільшує кількість на задане позитивне значення
    add(value) {
        if (typeof value !== "number" || value <= 0) {
            throw new Error("Value must be a positive number");
        }

        this.amount += value;
        console.log(`${value} ${this.type} added. Total: ${this.amount}`);
    }

    // Метод витрати ресурсу: зменшує кількість, якщо достатньо ресурсу; інакше повертає false
    spend(value) {
        if (typeof value !== "number" || value <= 0) {
            throw new Error("Value must be a positive number");
        }

        if (this.amount < value) {
            console.log(`Not enough ${this.type}`);
            return false;
        }

        this.amount -= value;
        console.log(`${value} ${this.type} spent. Left: ${this.amount}`);
        return true;
    }

     // Метод множення ресурсу: збільшує кількість шляхом множення (для цілих і дробових значень)
    multiply(factor) {
        if (typeof factor !== "number" || factor <= 0) {
            throw new Error("Factor must be a positive number");
        }

        if (Number.isInteger(factor)) {
            let result = 0;
            const base = this.amount;

            for (let i = 0; i < factor; i++) {
                result += base;
            }

            this.amount = result;
        } else {
            this.amount *= factor;
        }

        console.log(`${this.type} multiplied. New amount: ${this.amount}`);
    }
}

module.exports = Resource;