import { jest } from "@jest/globals";
import request from "supertest";
import app from "../src/app.js";

jest.setTimeout(20000);

describe("Auth Routes", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "123456",
    });

    console.log("Register response:", res.body);

    expect([200, 201]).toContain(res.statusCode);
  });

  it("should login successfully", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "123456",
    });

    console.log("Login response:", res.body);

    expect([200, 201]).toContain(res.statusCode);
  });
});
