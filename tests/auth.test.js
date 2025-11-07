import request from "supertest";
import app from "../src/app.js";

describe("Auth Routes", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "123456",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it("should login successfully", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "123456",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
