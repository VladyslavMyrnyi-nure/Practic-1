using System;
using CharacterLib;
using Xunit;

namespace CharacterLib.Tests
{
    /// <summary>
    /// Набір модульних тестів для класу Character.
    /// Кожен тест написано за патерном AAA (Arrange – Act – Assert).
    /// Техніки: EP — еквівалентне розбиття, BVA — аналіз граничних значень.
    /// </summary>
    public class CharacterTests
    {
        // ─────────────────────────────────────────────────
        // БЛОК 1: Конструктор
        // ─────────────────────────────────────────────────

        [Fact]
        public void Constructor_ValidParameters_CreatesCharacter()
        {
            // EP: допустимий клас — усі значення в межах норми
            // Arrange
            // (без додаткової підготовки)

            // Act
            var character = new Character(1, 100, 50, 0);

            // Assert
            Assert.Equal(1, character.Level);
            Assert.Equal(100, character.Health);
            Assert.Equal(50, character.Energy);
            Assert.Equal(0, character.Experience);
        }

        [Fact]
        public void Constructor_LevelZero_ThrowsArgumentException()
        {
            // EP: недопустимий клас — рівень < 1
            // BVA: межа рівня = 1, значення = 0

            // Arrange
            // (немає)

            // Act & Assert
            Assert.Throws<ArgumentException>(() => new Character(0, 100, 50, 0));
        }

        [Fact]
        public void Constructor_NegativeHealth_ThrowsArgumentException()
        {
            // EP: недопустимий клас — здоров'я < 0
            // BVA: межа = 0, значення = -1

            // Arrange
            // (немає)

            // Act & Assert
            Assert.Throws<ArgumentException>(() => new Character(1, -1, 50, 0));
        }

        [Fact]
        public void Constructor_HealthAboveMax_ThrowsArgumentException()
        {
            // EP: недопустимий клас — здоров'я > MaxHealth
            // BVA: межа = 100, значення = 101

            // Arrange
            // (немає)

            // Act & Assert
            Assert.Throws<ArgumentException>(() => new Character(1, 101, 50, 0));
        }

        [Fact]
        public void Constructor_NegativeExperience_ThrowsArgumentException()
        {
            // EP: недопустимий клас — досвід < 0

            // Arrange
            // (немає)

            // Act & Assert
            Assert.Throws<ArgumentException>(() => new Character(1, 100, 50, -1));
        }

        // ─────────────────────────────────────────────────
        // БЛОК 2: TakeDamage
        // ─────────────────────────────────────────────────

        [Fact]
        public void TakeDamage_ValidDamage_ReducesHealth()
        {
            // EP: позитивний клас — допустиме пошкодження
            // Arrange
            var character = new Character(1, 100, 50, 0);

            // Act
            character.TakeDamage(30);

            // Assert
            Assert.Equal(70, character.Health);
        }

        [Fact]
        public void TakeDamage_DamageEqualToHealth_HealthBecomesZero()
        {
            // BVA: пошкодження точно рівне здоров'ю — межова ситуація
            // Arrange
            var character = new Character(1, 50, 50, 0);

            // Act
            character.TakeDamage(50);

            // Assert
            Assert.Equal(0, character.Health);
            Assert.False(character.IsAlive);
        }

        [Fact]
        public void TakeDamage_DamageExceedsHealth_HealthClampsToZero()
        {
            // BVA: пошкодження більше здоров'я — нижня межа 0
            // Arrange
            var character = new Character(1, 30, 50, 0);

            // Act
            character.TakeDamage(100);

            // Assert
            Assert.Equal(0, character.Health);
        }

        [Fact]
        public void TakeDamage_NegativeDamage_ThrowsArgumentException()
        {
            // EP: недопустимий клас — від'ємне пошкодження
            // Arrange
            var character = new Character(1, 100, 50, 0);

            // Act & Assert
            Assert.Throws<ArgumentException>(() => character.TakeDamage(-5));
        }

        [Fact]
        public void TakeDamage_WhenDead_ThrowsInvalidOperationException()
        {
            // EP: недопустимий стан — персонаж мертвий (Health = 0)
            // Arrange
            var character = new Character(1, 0, 50, 0);

            // Act & Assert
            Assert.Throws<InvalidOperationException>(() => character.TakeDamage(10));
        }

        // ─────────────────────────────────────────────────
        // БЛОК 3: Upgrade
        // ─────────────────────────────────────────────────

        [Fact]
        public void Upgrade_EnoughExperience_LevelIncreases()
        {
            // EP: допустимий клас — досвід >= 100
            // Arrange
            var character = new Character(1, 50, 20, 100);

            // Act
            bool result = character.Upgrade();

            // Assert
            Assert.True(result);
            Assert.Equal(2, character.Level);
            Assert.Equal(Character.MaxHealth, character.Health);   // здоров'я відновлено
            Assert.Equal(Character.MaxEnergy, character.Energy);   // енергія відновлена
            Assert.Equal(0, character.Experience);                 // досвід витрачено
        }

        [Fact]
        public void Upgrade_InsufficientExperience_ReturnsFalse()
        {
            // EP: недопустимий клас — досвід < 100
            // BVA: межа = 100, значення = 99
            // Arrange
            var character = new Character(1, 100, 50, 99);

            // Act
            bool result = character.Upgrade();

            // Assert
            Assert.False(result);
            Assert.Equal(1, character.Level);  // рівень не змінився
        }

        [Fact]
        public void Upgrade_ExactlyEnoughExperience_Succeeds()
        {
            // BVA: межа — рівно 100 досвіду
            // Arrange
            var character = new Character(1, 100, 50, 100);

            // Act
            bool result = character.Upgrade();

            // Assert
            Assert.True(result);
        }

        // ─────────────────────────────────────────────────
        // БЛОК 4: UseEnergy
        // ─────────────────────────────────────────────────

        [Fact]
        public void UseEnergy_ValidAmount_ReducesEnergy()
        {
            // EP: позитивний клас — допустима кількість енергії
            // Arrange
            var character = new Character(1, 100, 50, 0);

            // Act
            character.UseEnergy(20);

            // Assert
            Assert.Equal(30, character.Energy);
        }

        [Fact]
        public void UseEnergy_ExceedsEnergy_ThrowsInvalidOperationException()
        {
            // EP: недопустимий клас — amount > Energy
            // BVA: Energy = 10, amount = 11
            // Arrange
            var character = new Character(1, 100, 10, 0);

            // Act & Assert
            Assert.Throws<InvalidOperationException>(() => character.UseEnergy(11));
        }

        [Fact]
        public void UseEnergy_NegativeAmount_ThrowsArgumentException()
        {
            // EP: недопустимий клас — від'ємна кількість
            // Arrange
            var character = new Character(1, 100, 50, 0);

            // Act & Assert
            Assert.Throws<ArgumentException>(() => character.UseEnergy(-1));
        }

        [Fact]
        public void UseEnergy_ExactlyAllEnergy_EnergyBecomesZero()
        {
            // BVA: amount = Energy — межова ситуація (використати все)
            // Arrange
            var character = new Character(1, 100, 50, 0);

            // Act
            character.UseEnergy(50);

            // Assert
            Assert.Equal(0, character.Energy);
        }

        // ─────────────────────────────────────────────────
        // БЛОК 5: GainExperience
        // ─────────────────────────────────────────────────

        [Fact]
        public void GainExperience_ValidAmount_IncreasesExperience()
        {
            // EP: позитивний клас — коректне значення
            // Arrange
            var character = new Character(1, 100, 50, 0);

            // Act
            character.GainExperience(50);

            // Assert
            Assert.Equal(50, character.Experience);
        }

        [Fact]
        public void GainExperience_NegativeAmount_ThrowsArgumentException()
        {
            // EP: недопустимий клас — від'ємне значення
            // Arrange
            var character = new Character(1, 100, 50, 0);

            // Act & Assert
            Assert.Throws<ArgumentException>(() => character.GainExperience(-10));
        }

        // ─────────────────────────────────────────────────
        // БЛОК 6: GenerateProfile
        // ─────────────────────────────────────────────────

        [Fact]
        public void GenerateProfile_AliveCharacter_ContainsAliveStatus()
        {
            // EP: позитивний клас — живий персонаж
            // Arrange
            var character = new Character(3, 80, 30, 50);

            // Act
            string profile = character.GenerateProfile();

            // Assert
            Assert.Contains("Живий", profile);
            Assert.Contains("3", profile);
        }

        [Fact]
        public void GenerateProfile_DeadCharacter_ContainsDeadStatus()
        {
            // EP: стан "мертвий" — Health = 0
            // Arrange
            var character = new Character(1, 0, 50, 0);

            // Act
            string profile = character.GenerateProfile();

            // Assert
            Assert.Contains("Мертвий", profile);
        }
    }
}
