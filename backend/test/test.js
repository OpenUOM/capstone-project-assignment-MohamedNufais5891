const server = require("../server.js");
const supertest = require("supertest");
const requestWithSupertest = supertest(server);

const db = require("../db-config");
const testBase = require("./testBase");

// Reset the database before all tests
beforeAll(async () => {
  await testBase.resetDatabase(db);
});

// Reset the database after every test
afterEach(async () => {
  await testBase.resetDatabase(db);
});

describe("Teacher Endpoints", () => {
  it("GET /listTeachers should show all teachers", async () => {
    const res = await requestWithSupertest.get("/listTeachers");
    expect(res.status).toBe(200);

    const body = res.body;
    expect(body.length).toBe(3);

    body.forEach((teacher) => {
      expect(teacher).toHaveProperty("id");
      expect(teacher).toHaveProperty("name");
      expect(teacher).toHaveProperty("age");
    });

    expect(body[0].name).toBe("Kusuma Ranasinghe");
    expect(body[1].name).toBe("Saman De Silva");
    expect(body[2].name).toBe("Parasanna Mahagamage");
  });

  it("POST /addTeacher should show a newly added teacher", async () => {
    await requestWithSupertest.post("/addTeacher").send({
      id: 10033,
      name: "Nilanthi Fernando",
      age: 42,
    });

    const res = await requestWithSupertest.get("/listTeachers");
    expect(res.status).toBe(200);

    const body = res.body;
    expect(body.length).toBe(4);

    expect(body).toContainEqual({
      id: 10033,
      name: "Nilanthi Fernando",
      age: 42,
    });
  });

  it("POST /editTeacher should edit a teacher", async () => {
    await requestWithSupertest.post("/editTeacher").send({
      id: 10002,
      name: "Saman",
      age: 50,
    });

    const res = await requestWithSupertest.get("/listTeachers");
    expect(res.status).toBe(200);

    const body = res.body;
    expect(body).toContainEqual({
      id: 10002,
      name: "Saman",
      age: 50,
    });

    expect(body).not.toContainEqual({
      name: "Saman De Silva",
    });
  });

  it("POST /deleteTeacher should delete a teacher", async () => {
    await requestWithSupertest.post("/deleteTeacher").send({
      id: 10003,
    });

    const res = await requestWithSupertest.get("/listTeachers");
    expect(res.status).toBe(200);

    const body = res.body;
    expect(body.length).toBe(2);

    expect(body).not.toContainEqual({
      id: 10003,
      name: "Parasanna Mahagamage",
      age: 30,
    });
  });
});

describe("Student Endpoints", () => {
  it("GET /listStudents should show all students", async () => {
    const res = await requestWithSupertest.get("/listStudents");
    expect(res.status).toBe(200);

    const body = res.body;
    expect(body.length).toBe(1);

    body.forEach((student) => {
      expect(student).toHaveProperty("id");
      expect(student).toHaveProperty("name");
      expect(student).toHaveProperty("age");
      expect(student).toHaveProperty("hometown");
    });

    expect(body[0].name).toBe("Rashini Shehara");
    expect(body[1].name).toBe("Sandun Perera");
    expect(body[2].name).toBe("Isuri De Silva");
  });

  it("POST /addStudent should show a newly added student", async () => {
    await requestWithSupertest.post("/addStudent").send({
      id: 99999,
      name: "Rashini Shehara",
      age: 12,
      hometown: "Galle",
    });

    const res = await requestWithSupertest.get("/listStudents");
    expect(res.status).toBe(200);

    const body = res.body;
    expect(body.length).toBe(4);

    expect(body).toContainEqual({
      id: 99999,
      name: "Rashini Shehara",
      age: 12,
      hometown: "Galle",
    });
  });

  it("POST /editStudent should edit a student", async () => {
    await requestWithSupertest.post("/editStudent").send({
      id: 99999,
      name: "Rashini Shehara",
      age: 12,
      hometown: "Galle",
    });

    const res = await requestWithSupertest.get("/listStudents");
    expect(res.status).toBe(200);

    const body = res.body;
    expect(body).toContainEqual({
      id: 99999,
      name: "Rashini Shehara",
      age: 12,
      hometown: "Galle", 
    });

    expect(body).not.toContainEqual({
      name: "Sandun Perera",
    });
  });

  it("POST /deleteStudent should delete a student", async () => {
    await requestWithSupertest.post("/deleteStudent").send({
      id: 20003,
    });

    const res = await requestWithSupertest.get("/listStudents");
    expect(res.status).toBe(200);

    const body = res.body;
    expect(body.length).toBe(1);

    expect(body).not.toContainEqual({
      id: 20003,
      name: "Isuri De Silva",
      age: 13,
      hometown: "Galle",
    });
  });
});
    
    
