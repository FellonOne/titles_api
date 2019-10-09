const request = require("supertest");
const confing = require("../config");

confing.APP_ENV = "test";
const server = require("../jest_server");
const structure = require('./tree/structure_1');
const changeQual = require('./tree/change_qualification_1');

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


  it("Тестирование структуры #2 ID:101", async () => {
    const update = await request(server).get("/api/v1/update");

    expect(update.status).toEqual(200);
    expect(update.type).toEqual("application/json");

    const update2 = await request(server).get("/api/v1/update");

    expect(update2.status).toEqual(200);
    expect(update2.type).toEqual("application/json");

    const response = await request(server).get("/api/v1/title/101");
    expect(response.status).toEqual(200);
    expect(response.type).toEqual("application/json");



    expect(response.body.state).toEqual("success");
    const bonus = response.body.user;

    // Titiles
    expect(bonus.titles_id).toEqual(5);

    // Personal Bonus
    expect(bonus.personal_bonus).toBeCloseTo(20);
    // Level Bonus
    expect(bonus.level_bonus).toBeCloseTo(38);
    // Step bonus
    expect(bonus.step_bonus).toBeCloseTo(70);

    // Group Points
    expect(bonus.group_points).toBeCloseTo(1400);
    // Structure Points
    expect(bonus.structure_points).toBeCloseTo(1400);
    // Salary
    expect(bonus.salary).toBeCloseTo(512000);
  });



  it("Тестирование структуры #2 ID:112", async () => {
    const update = await request(server).get("/api/v1/update");

    expect(update.status).toEqual(200);
    expect(update.type).toEqual("application/json");

    const update2 = await request(server).get("/api/v1/update");

    expect(update2.status).toEqual(200);
    expect(update2.type).toEqual("application/json");

    const response = await request(server).get("/api/v1/title/112");
    expect(response.status).toEqual(200);
    expect(response.type).toEqual("application/json");



    expect(response.body.state).toEqual("success");
    const bonus = response.body.user;

    // Titiles
    expect(bonus.titles_id).toEqual(3);

    // Personal Bonus
    expect(bonus.personal_bonus).toBeCloseTo(10);
    // Level Bonus
    expect(bonus.level_bonus).toBeCloseTo(16);
    // Step bonus
    expect(bonus.step_bonus).toBeCloseTo(10);

    // Group Points
    expect(bonus.group_points).toBeCloseTo(300);
    // Structure Points
    expect(bonus.structure_points).toBeCloseTo(300);
    // Salary
    expect(bonus.salary).toBeCloseTo(144000);
  });


  it("Тестирование структуры #2 ID:113", async () => {
    const update = await request(server).get("/api/v1/update");

    expect(update.status).toEqual(200);
    expect(update.type).toEqual("application/json");

    const update2 = await request(server).get("/api/v1/update");

    expect(update2.status).toEqual(200);
    expect(update2.type).toEqual("application/json");

    const response = await request(server).get("/api/v1/title/113");
    expect(response.status).toEqual(200);
    expect(response.type).toEqual("application/json");



    expect(response.body.state).toEqual("success");
    const bonus = response.body.user;

    // Titiles
    expect(bonus.titles_id).toEqual(4);

    // Personal Bonus
    expect(bonus.personal_bonus).toBeCloseTo(15);
    // Level Bonus
    expect(bonus.level_bonus).toBeCloseTo(16);
    // Step bonus
    expect(bonus.step_bonus).toBeCloseTo(10);

    // Group Points
    expect(bonus.group_points).toBeCloseTo(300);
    // Structure Points
    expect(bonus.structure_points).toBeCloseTo(300);
    // Salary
    expect(bonus.salary).toBeCloseTo(164000);
  });


  it("Тестирование структуры #2 ID:114", async () => {
    const update = await request(server).get("/api/v1/update");

    expect(update.status).toEqual(200);
    expect(update.type).toEqual("application/json");

    const update2 = await request(server).get("/api/v1/update");

    expect(update2.status).toEqual(200);
    expect(update2.type).toEqual("application/json");

    const response = await request(server).get("/api/v1/title/114");
    expect(response.status).toEqual(200);
    expect(response.type).toEqual("application/json");



    expect(response.body.state).toEqual("success");
    const bonus = response.body.user;

    // Titiles
    expect(bonus.titles_id).toEqual(4);

    // Personal Bonus
    expect(bonus.personal_bonus).toBeCloseTo(15);
    // Level Bonus
    expect(bonus.level_bonus).toBeCloseTo(32);
    // Step bonus
    expect(bonus.step_bonus).toBeCloseTo(40);

    // Group Points
    expect(bonus.group_points).toBeCloseTo(500);
    // Structure Points
    expect(bonus.structure_points).toBeCloseTo(500);
    // Salary
    expect(bonus.salary).toBeCloseTo(348000);
  });


  it("Тестирование структуры #2 ID:124", async () => {
    const update = await request(server).get("/api/v1/update");

    expect(update.status).toEqual(200);
    expect(update.type).toEqual("application/json");

    const update2 = await request(server).get("/api/v1/update");

    expect(update2.status).toEqual(200);
    expect(update2.type).toEqual("application/json");

    const response = await request(server).get("/api/v1/title/124");
    expect(response.status).toEqual(200);
    expect(response.type).toEqual("application/json");



    expect(response.body.state).toEqual("success");
    const bonus = response.body.user;

    // Titiles
    expect(bonus.titles_id).toEqual(2);

    // Personal Bonus
    expect(bonus.personal_bonus).toBeCloseTo(10);
    // Level Bonus
    expect(bonus.level_bonus).toBeCloseTo(0);
    // Step bonus
    expect(bonus.step_bonus).toBeCloseTo(0);

    // Group Points
    expect(bonus.group_points).toBeCloseTo(200);
    // Structure Points
    expect(bonus.structure_points).toBeCloseTo(200);
    // Salary
    expect(bonus.salary).toBeCloseTo(40000);
  });




  it("Тестирование структуры #3 ID:202", async () => {
    const update = await request(server).get("/api/v1/update");

    expect(update.status).toEqual(200);
    expect(update.type).toEqual("application/json");

    const update2 = await request(server).get("/api/v1/update");

    expect(update2.status).toEqual(200);
    expect(update2.type).toEqual("application/json");

    const response = await request(server).get("/api/v1/title/202");
    expect(response.status).toEqual(200);
    expect(response.type).toEqual("application/json");



    expect(response.body.state).toEqual("success");
    const bonus = response.body.user;

    // Titiles
    expect(bonus.titles_id).toEqual(6);

    // Personal Bonus
    expect(bonus.personal_bonus).toBeCloseTo(25);
    // Level Bonus
    expect(bonus.level_bonus).toBeCloseTo(46);
    // Step bonus
    expect(bonus.step_bonus).toBeCloseTo(110);

    // Group Points
    expect(bonus.group_points).toBeCloseTo(900);
    // Structure Points
    expect(bonus.structure_points).toBeCloseTo(900);
    // Salary
    expect(bonus.salary).toBeCloseTo(724000);
  });


  it("Тестирование структуры #3 ID:210", async () => {
    const update = await request(server).get("/api/v1/update");

    expect(update.status).toEqual(200);
    expect(update.type).toEqual("application/json");

    const update2 = await request(server).get("/api/v1/update");

    expect(update2.status).toEqual(200);
    expect(update2.type).toEqual("application/json");

    const response = await request(server).get("/api/v1/title/210");
    expect(response.status).toEqual(200);
    expect(response.type).toEqual("application/json");



    expect(response.body.state).toEqual("success");
    const bonus = response.body.user;

    // Titiles
    expect(bonus.titles_id).toEqual(3);

    // Personal Bonus
    expect(bonus.personal_bonus).toBeCloseTo(10);
    // Level Bonus
    expect(bonus.level_bonus).toBeCloseTo(24);
    // Step bonus
    expect(bonus.step_bonus).toBeCloseTo(10);

    // Group Points
    expect(bonus.group_points).toBeCloseTo(400);
    // Structure Points
    expect(bonus.structure_points).toBeCloseTo(400);
    // Salary
    expect(bonus.salary).toBeCloseTo(176000);
  });
});
