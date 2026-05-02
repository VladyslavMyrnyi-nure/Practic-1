class Workout {
    constructor(workoutId, date, duration, caloriesBurned) {
        if (workoutId <= 0) {
            throw new Error("Invalid workoutId");
        }

        if (!(date instanceof Date)) {
            throw new Error("Invalid date");
        }

        if (duration <= 0) {
            throw new Error("Invalid duration");
        }

        if (caloriesBurned < 0) {
            throw new Error("Invalid caloriesBurned");
        }

        this.workoutId = workoutId;
        this.date = date;
        this.duration = duration;
        this.caloriesBurned = caloriesBurned;
    }

    // Повертає короткий опис тренування
    getSummary() {
        return `Workout #${this.workoutId}: ${this.duration} min, ${this.caloriesBurned} kcal`;
    }

    // Обчислює калорії за хвилину
    calculateCaloriesPerMinute() {
        if (this.duration === 0) {
            throw new Error("Division by zero");
        }

        return this.caloriesBurned / this.duration;
    }

    // Перевіряє чи довге тренування (>=60 хв)
    isLongWorkout() {
        return this.duration >= 60;
    }

    // Метод з циклом для обчислення прогресу калорій за кожну хвилину
    getCaloriesProgress() {
        let result = [];
        let perMinute = this.calculateCaloriesPerMinute();

        for (let i = 1; i <= this.duration; i++) {
            result.push(Math.round(perMinute * i));
        }

        return result;
    }
}

module.exports = Workout;