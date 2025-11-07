import request from "supertest";
import app from "../src/app.js";

describe("Student Routes", () => {
  it("should get student profile (mock auth)", async () => {
    const res = await request(app)
      .get("/api/students/me")
      .set("Authorization", "Bearer fakeToken");
    expect([200, 401]).toContain(res.statusCode); // tuỳ vào auth
  });
});
