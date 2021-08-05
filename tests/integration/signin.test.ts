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
  it("should answer with status code 200 and a object containing a token for valid body params", async () => {
    
    const user= {
      email:"teste@teste.com",
      password: "123",
      confirmPassword: "123"
    }
    
    await supertest(app).post("/sign-up").send(user)

    const response = await supertest(app).post("/sign-in").send(user);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        token: expect.any(String)
      })
    )
  });

  it("should answer with status code 400 for invalid email format", async () => {

    const response = await supertest(app).post("/sign-in").send({
      email:"teste",
      password: "123"
    });

    expect(response.status).toBe(400);
  });

  it("should answer with status code 401 for email and password not matching", async () => {
    await createUser()
    const response = await supertest(app).post("/sign-in").send({
      email:"teste@teste.com",
      password: "notAValidPassword"
    });

    expect(response.status).toBe(401);
  });

});
