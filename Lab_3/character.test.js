// character.test.js
const Character = require('./character');

describe("Character tests", () => {

    // EP + BVA constructor
    test("should create valid character (EP positive)", () => {
        const c = new Character(1, 100, 100, 0);
        expect(c.level).toBe(1);
    });

    test("should throw error for invalid level (BVA)", () => {
        expect(() => new Character(0, 100, 100, 0)).toThrow();
    });

    test("should throw error for health > 100 (BVA)", () => {
        expect(() => new Character(1, 101, 100, 0)).toThrow();
    });

    // generateProfile
    test("should generate profile (EP positive)", () => {
        const c = new Character();
        const result = c.generateProfile("Hero");
        expect(result).toContain("Hero");
    });

    test("should throw on empty string (BVA)", () => {
        const c = new Character();
        expect(() => c.generateProfile("")).toThrow();
    });

    // upgrade
    test("should upgrade when enough XP (BVA)", () => {
        const c = new Character(1, 50, 50, 100);
        c.upgrade();
        expect(c.level).toBe(2);
    });

    test("should fail upgrade with low XP (EP negative)", () => {
        const c = new Character(1, 50, 50, 99);
        expect(() => c.upgrade()).toThrow();
    });

    // takeDamage
    test("should reduce health (EP positive)", () => {
        const c = new Character();
        c.takeDamage(20);
        expect(c.health).toBe(80);
    });

    test("health should not go below 0 (BVA)", () => {
        const c = new Character();
        c.takeDamage(200);
        expect(c.health).toBe(0);
    });

    test("should throw on negative damage (EP negative)", () => {
        const c = new Character();
        expect(() => c.takeDamage(-1)).toThrow();
    });
});