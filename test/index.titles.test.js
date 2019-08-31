const request = require("supertest");
const confing = require("../config");

confing.APP_ENV = "test";
const server = require("../src/jest_server");

afterEach(async () => {
  await server.close();
});

describe("Тестирование роута: /api/v1/title", () => {
  it("Тестирование структуры #1 ID:2", async () => {
    const update = await request(server).get("/api/v1/update");

    expect(update.status).toEqual(200);
    expect(update.type).toEqual("application/json");

    const update2 = await request(server).get("/api/v1/update");

    expect(update2.status).toEqual(200);
    expect(update2.type).toEqual("application/json");

    const response = await request(server).get("/api/v1/title/2");
    expect(response.status).toEqual(200);
    expect(response.type).toEqual("application/json");

    expect(response.body.state).toEqual("success");
    const bonus = response.body.user;

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
    // Salary
    expect(bonus.salary).toBeCloseTo(5334440);
  });

  it("Тестирование структуры #1 ID:19", async () => {
    
    const update = await request(server).get("/api/v1/update");

    expect(update.status).toEqual(200);
    expect(update.type).toEqual("application/json");

    const update2 = await request(server).get("/api/v1/update");

    expect(update2.status).toEqual(200);
    expect(update2.type).toEqual("application/json");

    const response = await request(server).get("/api/v1/title/19");
    expect(response.status).toEqual(200);
    expect(response.type).toEqual("application/json");

    expect(response.body.state).toEqual("success");
    const bonus = response.body.user;

    // Titiles
    expect(bonus.titles_id).toEqual(8);

    // Personal Bonus
    expect(bonus.personal_bonus).toBeCloseTo(1170);
    // Level Bonus
    expect(bonus.level_bonus).toBeCloseTo(0);
    // Step bonus
    expect(bonus.step_bonus).toBeCloseTo(0);

    // Group Points
    expect(bonus.group_points).toBeCloseTo(3000);
    // Structure Points
    expect(bonus.structure_points).toBeCloseTo(3000);
    // Salary
    expect(bonus.salary).toBeCloseTo(4680000);
  });

  it("Тестирование структуры #1 ID:12", async () => {
    
    const update = await request(server).get("/api/v1/update");

    expect(update.status).toEqual(200);
    expect(update.type).toEqual("application/json");

    const update2 = await request(server).get("/api/v1/update");

    expect(update2.status).toEqual(200);
    expect(update2.type).toEqual("application/json");

    const response = await request(server).get("/api/v1/title/12");
    expect(response.status).toEqual(200);
    expect(response.type).toEqual("application/json");

    expect(response.body.state).toEqual("success");
    const bonus = response.body.user;

    // Titiles
    expect(bonus.titles_id).toEqual(9);

    // Personal Bonus
    expect(bonus.personal_bonus).toBeCloseTo(460);
    // Level Bonus
    expect(bonus.level_bonus).toBeCloseTo(240);
    // Step bonus
    expect(bonus.step_bonus).toBeCloseTo(210);

    // Group Points
    expect(bonus.group_points).toBeCloseTo(4000);
    // Structure Points
    expect(bonus.structure_points).toBeCloseTo(4000);
    // Salary
    expect(bonus.salary).toBeCloseTo(3640000);
  });
});
