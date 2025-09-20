const supertest = require('supertest');
const app = require('../src/index.js'); 

const request = supertest(app);

describe("sample test endpoint", () => {
    test("should return response on ping", async () => {
        const response = await request.get("/ping");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ msg: 'ok' });
    });
});
