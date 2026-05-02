const Resource = require("../main/resource");

describe("Resource class", () => {

    test("constructor valid input (EP positive)", () => {
        const type = "wood";
        const amount = 10;

        const res = new Resource(type, amount);

        expect(res.type).toBe(type);
        expect(res.amount).toBe(amount);
    });

    test("constructor empty type (EP negative)", () => {
        expect(() => new Resource("", 10)).toThrow();
    });

    test("constructor negative amount (BVA)", () => {
        expect(() => new Resource("wood", -1)).toThrow();
    });

    test("add valid value (BVA positive)", () => {
        const r = new Resource("wood", 10);

        r.add(5);

        expect(r.amount).toBe(15);
    });

    test("add zero value (BVA boundary)", () => {
        const r = new Resource("wood", 10);

        expect(() => r.add(0)).toThrow();
    });

    test("add invalid type (EP negative)", () => {
        const r = new Resource("wood", 10);

        expect(() => r.add("5")).toThrow();
    });

    test("spend success (EP positive)", () => {
        const r = new Resource("wood", 10);

        const result = r.spend(5);

        expect(result).toBe(true);
        expect(r.amount).toBe(5);
    });

    test("spend more than available (BVA boundary)", () => {
        const r = new Resource("wood", 10);

        const result = r.spend(15);

        expect(result).toBe(false);
        expect(r.amount).toBe(10);
    });

    test("spend invalid value (EP negative)", () => {
        const r = new Resource("wood", 10);

        expect(() => r.spend(-1)).toThrow();
    });

    test("multiply integer factor (EP positive)", () => {
        const r = new Resource("wood", 5);

        r.multiply(3);

        expect(r.amount).toBe(15);
    });

    test("multiply fractional factor (EP boundary)", () => {
        const r = new Resource("wood", 10);

        r.multiply(1.5);

        expect(r.amount).toBe(15);
    });

    test("multiply invalid factor (EP negative)", () => {
        const r = new Resource("wood", 10);

        expect(() => r.multiply(0)).toThrow();
    });

});