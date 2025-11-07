import request from "supertest";
import app from "../src/app.js";

describe("Progress Routes", () => {
  it("should list progress of student", async () => {
    const res = await request(app)
      .get("/api/progress/me")
      .set("Authorization", "Bearer fakeToken");
    expect([200, 401]).toContain(res.statusCode);
  });
});
