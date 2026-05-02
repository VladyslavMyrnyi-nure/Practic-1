class Character {

    // Конструктор — створення персонажа
    constructor(level = 1, health = 100, energy = 100, experience = 0) {

        // Перевірка рівня (не може бути менше 1)
        if (level < 1) throw new Error("Level must be >= 1");

        // Перевірка здоров'я (межі 0–100)
        if (health < 0 || health > 100) throw new Error("Health must be 0-100");

        // Перевірка енергії (межі 0–100)
        if (energy < 0 || energy > 100) throw new Error("Energy must be 0-100");

        // Перевірка досвіду (не може бути від’ємним)
        if (experience < 0) throw new Error("Experience must be >= 0");

        // Ініціалізація властивостей об'єкта
        this.level = level;
        this.health = health;
        this.energy = energy;
        this.experience = experience;
    }

    // Метод створення профілю персонажа
    generateProfile(data) {

        // Перевірка: data має бути непорожнім рядком
        if (typeof data !== "string" || data.length === 0) {
            throw new Error("Invalid data");
        }

        // Формуємо рядок з інформацією про персонажа
        return `Character: ${data}, Level: ${this.level}, HP: ${this.health}, Energy: ${this.energy}, XP: ${this.experience}`;
    }

    // Метод прокачки персонажа
    upgrade() {

        // Якщо досвіду менше 100 — не можна прокачатися
        if (this.experience < 100) {
            throw new Error("Not enough experience");
        }

        // Підвищуємо рівень на 1
        this.level += 1;

        // Віднімаємо 100 досвіду
        this.experience -= 100;

        // Відновлюємо здоров'я до максимуму
        this.health = 100;

        // Відновлюємо енергію до максимуму
        this.energy = 100;
    }

    // Отримання шкоди
    takeDamage(amount) {

        // Перевірка: шкода не може бути від’ємною
        if (amount < 0) throw new Error("Damage must be >= 0");

        // 🔹 Зменшуємо здоров'я на величину шкоди
        this.health -= amount;

        // Якщо здоров'я впало нижче 0 — фіксуємо 0
        if (this.health < 0) {
            this.health = 0;
        }
    }
}

// Експорт класу для використання в тестах
module.exports = Character;