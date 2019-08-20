const request = require('supertest');
const confing = require('../config');
confing.APP_ENV = 'test';
const server  = require('../src/jest_server');

afterEach(() => {
    server.close();
});

describe("Тестирование роута: /api/v1/title", () => {
    it("Тестирование структуры #1", async () => {
        const response = await request(server).get("/api/v1/title");
        expect(response.status).toEqual(200);
        expect(response.type).toEqual("application/json");
    });
});