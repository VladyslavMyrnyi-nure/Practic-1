const Game = require('../main/Game');

describe('Тестування класу Game', () => {
  let game;

  beforeEach(() => {
    game = new Game(101);
  });


  //метод start()

  test('TC-01: Успішний старт гри (Позитивний)', () => {
    // Arrange (Підготувати)
    // Act (Виконати)
    const result = game.start();
    // Assert (Перевірити)
    expect(result).toBe("Гру розпочато");
    expect(game.isActive).toBe(true);
  });

  test('TC-02: Повторний старт активної гри (Equivalence Partitioning)', () => {
    // Arrange
    game.start();
    // Act & Assert
    expect(() => game.start()).toThrow("Гра вже триває");
  });


  //метод updateScore()

  test('TC-03: Додавання коректних очок (Позитивний)', () => {
    // Arrange
    game.start();
    // Act
    const result = game.updateScore(100);
    // Assert
    expect(result).toContain("100");
    expect(game.score).toBe(100);
  });

  test('TC-04: Додавання від’ємних очок (Boundary Value Analysis)', () => {
    // Arrange
    game.start();
    // Act & Assert
    expect(() => game.updateScore(-1)).toThrow("Кількість очок не може бути від’ємною");
  });

  test('TC-05: Додавання нульових очок (Boundary Value Analysis)', () => {
    // Arrange
    game.start();
    // Act
    game.updateScore(0);
    // Assert
    expect(game.score).toBe(0);
  });

  test('TC-06: Передача нечислового значення (Негативний)', () => {
    // Arrange
    game.start();
    // Act & Assert
    expect(() => game.updateScore("abc")).toThrow("Очки мають бути числом");
  });

  test('TC-07: Перевищення ліміту очок (Boundary Value Analysis)', () => {
    // Arrange
    game.start();
    // Act
    const result = game.updateScore(11000);
    // Assert
    expect(result).toBe("Досягнуто максимального рахунку");
    expect(game.score).toBe(10000);
  });

  test('TC-08: Спроба нарахувати очки в неактивній грі (Негативний)', () => {
    // Act & Assert
    expect(() => game.updateScore(10)).toThrow("гра не активна");
  });


  //метод end()
  
  test('TC-09: Успішне завершення гри (Позитивний)', () => {
    // Arrange
    game.start();
    game.updateScore(500);
    // Act
    const result = game.end();
    // Assert
    expect(result).toContain("500");
    expect(game.isActive).toBe(false);
  });

  test('TC-10: Завершення нерозпочатої гри (Equivalence Partitioning)', () => {
    // Act
    const result = game.end();
    // Assert
    expect(result).toBe("Гра ще не була розпочата");
  });
});