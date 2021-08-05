import supertest from "supertest";
import { getConnection } from "typeorm";

import app, { init } from "../../src/app";
import { createUser } from "../factories/userFactory";
import { clearDatabase } from "../utils/database";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await getConnection().close();
});

describe("POST /sign-up", () => {
  it("should answer with status code 201 for valid body params", async () => {

    const response = await supertest(app).post("/sign-up").send({
      email:"teste@teste.com",
      password: "123",
      confirmPassword: "123"
    });

    expect(response.status).toBe(201);
  });

  it("should answer with status code 409 for an email that is registered", async () => {
    const user = await createUser()

    const response = await supertest(app).post("/sign-up").send({
      email:"teste@teste.com",
      password: "123",
      confirmPassword: "123"
    });

    expect(response.status).toBe(409);
  });

  it("should answer with status code 400 for an invalid email pattern", async () => {

    const response = await supertest(app).post("/sign-up").send({
      email:"teste",
      password: "123",
      confirmPassword: "123"
    });

    expect(response.status).toBe(400);
  });

  it("should answer with status code 400 for an password that is differente from password confirmation", async () => {

    const response = await supertest(app).post("/sign-up").send({
      email:"teste@teste.com",
      password: "1234",
      confirmPassword: "banana"
    });

    expect(response.status).toBe(400);
  });

});
