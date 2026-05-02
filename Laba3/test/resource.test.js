const Resource = require("../main/resource");

describe("Resource class", () => {
    // TC1 Конструктор (валідні дані)
    test("constructor valid input (EP positive)", () => {
        const type = "wood";
        const amount = 10;

        const res = new Resource(type, amount);

        expect(res.type).toBe(type);
        expect(res.amount).toBe(amount);
    });
    // TC2 Конструктор (порожній тип)
    test("constructor empty type (EP negative)", () => {
        expect(() => new Resource("", 10)).toThrow();
    });
    // TC3 Конструктор (від’ємна кількість)
    test("constructor negative amount (BVA)", () => {
        expect(() => new Resource("wood", -1)).toThrow();
    });
    // TC4 Додавання (валідне значення)
    test("add valid value (BVA positive)", () => {
        const r = new Resource("wood", 10);

        r.add(5);

        expect(r.amount).toBe(15);
    });
    // TC5 Додавання (нульове значення)
    test("add zero value (BVA boundary)", () => {
        const r = new Resource("wood", 10);

        expect(() => r.add(0)).toThrow();
    });
    // TC6 Додавання (невалідний тип)
    test("add invalid type (EP negative)", () => {
        const r = new Resource("wood", 10);

        expect(() => r.add("5")).toThrow();
    });
    // TC7 Витрата ресурсів (успішне)
    test("spend success (EP positive)", () => {
        const r = new Resource("wood", 10);

        const result = r.spend(5);

        expect(result).toBe(true);
        expect(r.amount).toBe(5);
    });
    // TC8 Витрата більше ніж є
    test("spend more than available (BVA boundary)", () => {
        const r = new Resource("wood", 10);

        const result = r.spend(15);

        expect(result).toBe(false);
        expect(r.amount).toBe(10);
    });
    // TC9 Витрата (невалідне значення)
    test("spend invalid value (EP negative)", () => {
        const r = new Resource("wood", 10);

        expect(() => r.spend(-1)).toThrow();
    });
    // TC10 Множення (ціле число)
    test("multiply integer factor (EP positive)", () => {
        const r = new Resource("wood", 5);

        r.multiply(3);

        expect(r.amount).toBe(15);
    });
    // TC11 Множення (дробове число)
    test("multiply fractional factor (EP boundary)", () => {
        const r = new Resource("wood", 10);

        r.multiply(1.5);

        expect(r.amount).toBe(15);
    });
    // TC12 Множення (невалідне значення)
    test("multiply invalid factor (EP negative)", () => {
        const r = new Resource("wood", 10);

        expect(() => r.multiply(0)).toThrow();
    });

});