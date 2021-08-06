import supertest from "supertest";
import { getConnection } from "typeorm";

import app, { init } from "../../src/app";
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
  it("should answer with status code 200 if token is valid", async () => {
    
    const user= {
      email:"teste@teste.com",
      password: "123",
      confirmPassword: "123"
    }
    
    await supertest(app).post("/sign-up").send(user)

    const token = await supertest(app).post("/sign-in").send(user);

    const response = await supertest(app).post("/my-pokemons/1/remove").set({authorization: `Bearer ${token.body.token}`})
    
    expect(response.status).toBe(200)
  });

  it("should answer with status code 401 for invalid token", async () => {

    const response = await supertest(app).post("/my-pokemons/1/remove").set({authorization: `Bearer NotAValidToken`})

    expect(response.status).toBe(401);
  });

});
