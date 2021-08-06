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
  it("should answer with a list of pokemons if user have a valid token", async () => {
    
    const user= {
      email:"teste@teste.com",
      password: "123",
      confirmPassword: "123"
    }
    
    await supertest(app).post("/sign-up").send(user)

    const token = await supertest(app).post("/sign-in").send(user);

    const response = await supertest(app).get("/pokemons").set({authorization: `Bearer ${token.body.token}`})
    
    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.any(Object)
      ])
    )
  });

  it("should answer with status code 401 for invalid token", async () => {

    const response = await supertest(app).get("/pokemons").set({authorization: `Bearer NotAValidToken`})

    expect(response.status).toBe(401);
  });

  it("should answer with status code 401 when not sending a token", async () => {

    const response = await supertest(app).get("/pokemons")

    expect(response.status).toBe(401);
  });


});
