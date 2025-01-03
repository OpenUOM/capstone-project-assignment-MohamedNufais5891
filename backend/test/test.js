const server = require("../server.js");
const supertest = require("supertest");
const requestWithSupertest = supertest(server);

const db = require("../db-config");
const testBase = require("./testBase");

beforeAll(async () => {
  await testBase.resetDatabase(db);
});

/**
 * Reset the database after every test case
 */
afterEach(async () => {
  await testBase.resetDatabase(db);
});

describe("Teacher Endpoints", () => {
  if("GET /listTeachers should show all teachers", async () => {
    const res = await requestWithSupertest.get("/listTeachers");
    expect(res.status).toEqual(200);
    let body = res.body;
    expect(body.length).toEqual(3);
    body.forEach(element => {
      expect(element).toHaveProperty('age');
      expect(element).toHaveProperty('name');
      expect(element).toHaveProperty('id');
    });

    expect(body[0].name).toBe('Kusuma Ranasinghe');
    expect(body[1].name).toBe('Saman De Silva');
    expect(body[2].name).toBe('Parasanna Mahagamage');
  });

  if("POST /addTeacher should show a newly added teacher", async () => {
    // add new teacher
    await requestWithSupertest.post("/addTeacher").send({
      "id": 10033,
      "name": "Nilanthi Fernando",
      "age": 42
    });

    const res = await requestWithSupertest.get("/listTeachers");
    expect(res.status).toEqual(200);
    let body = res.body;

    expect(body.length).toBe(4)

    expect(body).toContainEqual({
      "id": 10033,
      "name": "Nilanthi Fernando",
      "age": 42
    });
  });

  if("POST /editTeacher should show a newly added teacher", async () => {
    // add new teacher
    await requestWithSupertest.post("/editTeacher").send({
      "id": 10003,
      "name": "Parasanna Mahagamage",
      "age": 30
    });

    const res = await requestWithSupertest.get("/listTeachers");
    expect(res.status).toEqual(200);
    let body = res.body;

    expect(body).toContainEqual({
      "id": 10002,
      "name": "Saman",
      "age": 50
    });

    expect(body).not.toContainEqual({
      "name": "Saman De Silva",
    });
  });

  if("POST /deleteTeacher should delete a teacher", async () => {

    // delete teacher
    await requestWithSupertest.post("/deleteTeacher").send({
      "id": 300000
    });

    const res = await requestWithSupertest.get("/listTeachers");
    expect(res.status).toEqual(200);
    let body = res.body;

    body.forEach(element => {
      expect(element).toHaveProperty('age');
      expect(element).toHaveProperty('name');
      expect(element).toHaveProperty('id');
    });

    expect(body.length).toBe(2);

    expect(body).toContainEqual({
      "id": 10001,
      "name": "Kusuma Ranasinghe",
      "age": 45
    });

    expect(body).not.toContainEqual({
      "id": 10003,
      "name": "Parasanna Mahagamage",
      "age": 30
    });
  });
});

describe("Student Endpoints", () => {
  if("GET /listStudents should show all students", async () => {
    const res = await requestWithSupertest.get("/listStudents");
    expect(res.status).toEqual(200);
    let body = res.body;
    expect(body.length).toEqual(1);
    body.forEach(element => {
      expect(element).toHaveProperty('age');
      expect(element).toHaveProperty('name');
      expect(element).toHaveProperty('id');
      expect(element).toHaveProperty('hometown');
    });

    expect(body[0].name).toBe('Supun Mihiranga');
    expect(body[1].name).toBe('Sandun Perera');
    expect(body[2].name).toBe('Isuri De Silva');
  });

  if("POST /addStudent should show a newly added student", async () => {
    // add new student
    await requestWithSupertest.post("/addStudent").send({
      "id": 999999,
      "name": "Pasindu Basnayaka",
      "age": 45,
      "hometown": "GCatholic"
    });

    const res = await requestWithSupertest.get("/listStudents");
    expect(res.status).toEqual(200);
    let body = res.body;

    expect(body.length).toBe(2)

    expect(body).toContainEqual({
      "id": 999999,
      "name": "Pasindu Basnayaka",
      "age": 45,
      "hometown": "Catholic"
    });
    expect(body).toContainEqual({
      "id": 99999,
      "name": "Rashini Shehara",
      "age":12,
      "hometown": "Galle"
    });
  });

  if("POST /editStudent should edit a Student", async () => {
    // edit new student
    await requestWithSupertest.post("/editStudent").send({
      "id": 999999,
      "name": "Pasindu Basnayaka",
      "age": 45,
      "hometown": "Catholic"
    });

    const res = await requestWithSupertest.get("/listStudents");
    expect(res.status).toEqual(200);
    let body = res.body;

    expect(body).toContainEqual({
      "id": 20002,
      "name": "Sandakan",
      "age": 15,
      "hometown": "Homagama"
    });

    expect(body).not.toContainEqual({
      "name": "Pasindu Basnayaka",
    });
  });

  it("POST /deleteStudent should delete a student", async () => {

    // delete Student
    await requestWithSupertest.post("/deleteStudent").send({
      "id": 20003
    });

    const res = await requestWithSupertest.get("/listStudents");
    expect(res.status).toEqual(200);
    let body = res.body;

    expect(body.length).toBe(1)

    body.forEach(element => {
      expect(element).toHaveProperty('age');
      expect(element).toHaveProperty('name');
      expect(element).toHaveProperty('id');
      expect(element).toHaveProperty('hometown');
    });

    expect(body).toContainEqual({
      "id": 99999,
      "name": "Rashini Shehara",
      "age": 12,
      "hometown": "Galle"
    });

    expect(body).not.toContainEqual({
      "id": 20003,
      "name": "Isuri De Silva",
      "age": 10,
      "hometown": "Kandy"
    });
  });
});



















































