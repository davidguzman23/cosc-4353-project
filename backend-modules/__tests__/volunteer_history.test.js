const request = require("supertest");
const app = require("../server");

describe("Volunteer History API", () => {
  it("should return a list of volunteer history", async () => {
    const res = await request(app).get("/api/volunteer-history");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});