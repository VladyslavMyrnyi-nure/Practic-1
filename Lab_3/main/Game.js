/**
 * Клас Game для керування ігровим процесом
 */
class Game {
  constructor(gameId) {
    this.gameId = gameId;
    this.score = 0;
    this.isActive = false;
    this.MAX_SCORE = 10000;
  }

  // Метод 1: Початок гри
  start() {
    if (this.isActive) {
      throw new Error("Гра вже триває");
    }
    this.score = 0;
    this.isActive = true;
    return "Гру розпочато";
  }

  // Метод 2: Оновлення рахунку (нетривіальна логіка)
  updateScore(points) {
    if (!this.isActive) {
      throw new Error("Неможливо оновити рахунок: гра не активна");
    }
    if (typeof points !== 'number' || isNaN(points)) {
      throw new Error("Очки мають бути числом");
    }
    if (points < 0) {
      throw new Error("Кількість очок не може бути від’ємною");
    }

    if (this.score + points > this.MAX_SCORE) {
      this.score = this.MAX_SCORE;
      return "Досягнуто максимального рахунку";
    }

    this.score += points;
    return `Рахунок оновлено: ${this.score}`;
  }

  // Метод 3: Завершення гри
  end() {
    if (!this.isActive) {
      return "Гра ще не була розпочата";
    }
    const finalScore = this.score;
    this.isActive = false;
    this.score = 0;
    return `Гру завершено. Ваш результат: ${finalScore}`;
  }
}

module.exports = Game;