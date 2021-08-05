import { getRepository } from "typeorm";

import User from "../../src/entities/User";

export async function createUser () {
  const user = await getRepository(User).create({
    email: "teste@teste.com",
    password: "123"
  });

  await getRepository(User).save(user);

  return user;
}
