using System;

namespace CharacterLib
{
    /// <summary>
    /// Клас персонажа гри. Зберігає рівень, здоров'я, енергію та досвід.
    /// </summary>
    public class Character
    {
        // Константи: максимальні значення характеристик
        public const int MaxHealth = 100;
        public const int MaxEnergy = 50;
        public const int ExperiencePerLevel = 100;

        public int Level { get; private set; }
        public int Health { get; private set; }
        public int Energy { get; private set; }
        public int Experience { get; private set; }

        /// <summary>
        /// Конструктор. Перевіряє коректність вхідних даних.
        /// </summary>
        public Character(int level, int health, int energy, int experience)
        {
            if (level < 1)
                throw new ArgumentException("Рівень повинен бути не менше 1.", nameof(level));
            if (health < 0 || health > MaxHealth)
                throw new ArgumentException($"Здоров'я має бути в діапазоні [0, {MaxHealth}].", nameof(health));
            if (energy < 0 || energy > MaxEnergy)
                throw new ArgumentException($"Енергія має бути в діапазоні [0, {MaxEnergy}].", nameof(energy));
            if (experience < 0)
                throw new ArgumentException("Досвід не може бути від'ємним.", nameof(experience));

            Level = level;
            Health = health;
            Energy = energy;
            Experience = experience;
        }

        /// <summary>
        /// Метод 1: Отримати пошкодження. Зменшує здоров'я.
        /// Кидає ArgumentException при від'ємному значенні.
        /// Кидає InvalidOperationException якщо персонаж вже мертвий.
        /// </summary>
        public void TakeDamage(int damage)
        {
            if (damage < 0)
                throw new ArgumentException("Пошкодження не може бути від'ємним.", nameof(damage));
            if (Health == 0)
                throw new InvalidOperationException("Персонаж вже мертвий.");

            Health = Math.Max(0, Health - damage);
        }

        /// <summary>
        /// Метод 2: Підвищення рівня. Використовує 100 одиниць досвіду.
        /// Повертає true — якщо підвищення відбулось, false — якщо досвіду недостатньо.
        /// При підвищенні рівня здоров'я та енергія повністю відновлюються.
        /// </summary>
        public bool Upgrade()
        {
            if (Experience < ExperiencePerLevel)
                return false;

            Experience -= ExperiencePerLevel;
            Level++;
            Health = MaxHealth;
            Energy = MaxEnergy;
            return true;
        }

        /// <summary>
        /// Метод 3: Витратити енергію.
        /// Кидає ArgumentException при від'ємному amount.
        /// Кидає InvalidOperationException якщо енергії недостатньо.
        /// </summary>
        public void UseEnergy(int amount)
        {
            if (amount < 0)
                throw new ArgumentException("Кількість енергії не може бути від'ємною.", nameof(amount));
            if (amount > Energy)
                throw new InvalidOperationException("Недостатньо енергії.");

            Energy -= amount;
        }

        /// <summary>
        /// Метод 4: Отримати досвід.
        /// Кидає ArgumentException при від'ємному значенні.
        /// </summary>
        public void GainExperience(int amount)
        {
            if (amount < 0)
                throw new ArgumentException("Кількість досвіду не може бути від'ємною.", nameof(amount));

            Experience += amount;
        }

        /// <summary>
        /// Метод 5: Генерація профілю персонажа у вигляді рядка.
        /// </summary>
        public string GenerateProfile()
        {
            string status = Health > 0 ? "Живий" : "Мертвий";
            return $"Рівень: {Level} | ХП: {Health}/{MaxHealth} | Енергія: {Energy}/{MaxEnergy} | Досвід: {Experience} | Статус: {status}";
        }

        /// <summary>
        /// Перевіряє, чи живий персонаж.
        /// </summary>
        public bool IsAlive => Health > 0;
    }
}
