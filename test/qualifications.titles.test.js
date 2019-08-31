const request = require("supertest");
const changeQual = require('./tree/change_qualification_1');
const confing = require("../config");

confing.APP_ENV = "test";
const server = require("../src/jest_server");
const structure = require('./tree/structure_1');

afterEach(async () => {
  await server.close();
});

describe("Тестирование роута: /api/v1/title", () => {
  it("Тестирование структуры #1 ID:2", async () => {
      await changeQual(1);
      const update = await request(server).get("/api/v1/update");

      expect(update.status).toEqual(200);
      expect(update.type).toEqual("application/json");

      const response = await request(server).get("/api/v1/title/2");
      expect(response.status).toEqual(200);
      expect(response.type).toEqual("application/json");

      expect(response.body.state).toEqual("success");
      const bonus = response.body.user;

      // Titiles
      expect(bonus.titles_id).toEqual(13);
      await structure();
  });
});
