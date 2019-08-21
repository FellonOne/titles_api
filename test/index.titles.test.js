const request = require('supertest');
const confing = require('../config');
confing.APP_ENV = 'test';
const server  = require('../src/jest_server');

afterEach(() => {
    server.close();
});

describe("Тестирование роута: /api/v1/title", () => {
    it("Тестирование структуры #1 ID:2", async () => {
        const response = await request(server).get("/api/v1/title/2");
        expect(response.status).toEqual(200);
        expect(response.type).toEqual("application/json");

        expect(response.body.state).toEqual("success");
        const bonus = response.body.users;

        // Titiles
        expect(bonus.titles_id).toEqual(14);

        // Personal Bonus
        expect(bonus.personal_bonus).toBeCloseTo(46);
        // Level Bonus
        expect(bonus.level_bonus).toBeCloseTo(524);
        // Step bonus
        expect(bonus.step_bonus).toBeCloseTo(543);

        // Group Points
        expect(bonus.group_points).toBeCloseTo(1950);
        // Structure Points
        expect(bonus.structure_points).toBeCloseTo(9950);
    });

    it("Тестирование структуры #1 ID:19", async () => {
        const response = await request(server).get("/api/v1/title/19");
        expect(response.status).toEqual(200);
        expect(response.type).toEqual("application/json");

        expect(response.body.state).toEqual("success");
        const bonus = response.body.users;

        // Titiles
        expect(bonus.titles_id).toEqual(14);

        // Personal Bonus
        expect(bonus.personal_bonus).toBeCloseTo(46);
        // Level Bonus
        expect(bonus.level_bonus).toBeCloseTo(524);
        // Step bonus
        expect(bonus.step_bonus).toBeCloseTo(543);

        // Group Points
        expect(bonus.group_points).toBeCloseTo(1950);
        // Structure Points
        expect(bonus.structure_points).toBeCloseTo(9950);
    });
});