import  Session  from "../../src/entities/Session";
import { getRepository } from "typeorm";

import User from "../../src/entities/User";

export async function clearDatabase () {

  await getRepository(Session).delete({});
  await getRepository(User).delete({});
}
