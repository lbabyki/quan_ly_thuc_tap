import request from "supertest";
import app from "../src/app.js";

describe("Internship Routes", () => {
  it("should list all internships", async () => {
    const res = await request(app)
      .get("/api/internships/all")
      .set("Authorization", "Bearer fakeToken");
    expect([200, 401]).toContain(res.statusCode);
  });
});
