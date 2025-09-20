const supertest = require("supertest");
const { app, server } = require("../src/index");

const request = supertest(app);

describe("sample test endpoint", () => {
  test("should return response on ping", async () => {
    const response = await request.get("/ping");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ msg: "ok" });
  });

  afterAll((done) => {
    server.close(done);  // closes the server after tests
  });
});
