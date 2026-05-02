const Workout = require("../main/Workout");

describe("Workout class tests (EP + BVA)", () => {

    // =========================
    // CONSTRUCTOR TESTS
    // =========================

    test("TC1 - Valid input (BVA)", () => {
        const workout = new Workout(1, new Date(), 30, 200);

        expect(workout.workoutId).toBe(1);
        expect(workout.duration).toBe(30);
        expect(workout.caloriesBurned).toBe(200);
    });

    test("TC2 - workoutId = 0 (BVA boundary)", () => {
        expect(() => {
            new Workout(0, new Date(), 30, 200);
        }).toThrow("Invalid workoutId");
    });

    test("TC3 - workoutId negative (EP invalid class)", () => {
        expect(() => {
            new Workout(-5, new Date(), 30, 200);
        }).toThrow("Invalid workoutId");
    });

    test("TC4 - invalid date type (EP)", () => {
        expect(() => {
            new Workout(1, "2025-01-01", 30, 200);
        }).toThrow("Invalid date");
    });

    test("TC5 - duration = 0 (BVA boundary)", () => {
        expect(() => {
            new Workout(1, new Date(), 0, 200);
        }).toThrow("Invalid duration");
    });

    test("TC6 - caloriesBurned = -1 (EP invalid class)", () => {
        expect(() => {
            new Workout(1, new Date(), 30, -1);
        }).toThrow("Invalid caloriesBurned");
    });


    // =========================
    // метод calculateCaloriesPerMinute()
    // =========================

    test("TC7 - normal calculation (EP)", () => {
        const workout = new Workout(1, new Date(), 30, 300);
        expect(workout.calculateCaloriesPerMinute()).toBe(10);
    });

    test("TC8 - duration = 1 (BVA)", () => {
        const workout = new Workout(1, new Date(), 1, 100);
        expect(workout.calculateCaloriesPerMinute()).toBe(100);
    });


    // =========================
    // метод isLongWorkout()
    // =========================

    test("TC9 - duration = 59 (BVA)", () => {
        const workout = new Workout(1, new Date(), 59, 100);
        expect(workout.isLongWorkout()).toBe(false);
    });

    test("TC10 - duration = 60 (boundary)", () => {
        const workout = new Workout(1, new Date(), 60, 100);
        expect(workout.isLongWorkout()).toBe(true);
    });

    test("TC11 - duration = 61 (BVA)", () => {
        const workout = new Workout(1, new Date(), 61, 100);
        expect(workout.isLongWorkout()).toBe(true);
    });


    // =========================
    // метод getCaloriesProgress()
    // =========================

    test("TC12 - small progression (EP)", () => {
        const workout = new Workout(1, new Date(), 3, 300);

        // 300 / 3 = 100 per minute
        expect(workout.getCaloriesProgress()).toEqual([100, 200, 300]);
    });

    test("TC13 - minimal duration = 1 (BVA)", () => {
        const workout = new Workout(1, new Date(), 1, 100);

        expect(workout.getCaloriesProgress()).toEqual([100]);
    });

});