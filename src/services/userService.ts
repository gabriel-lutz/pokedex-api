import { getRepository } from "typeorm";
import bcrypt from "bcrypt"
import User from "../entities/User";
import { v4 as uuidv4 } from 'uuid';
import Session from "../entities/Session";

interface userData{
  email: string,
  password:string,
  confirmPassword:string
}

export async function validatePasswordAndCreateHash (data: userData) {

  if(data.password !== data.confirmPassword){
    return null
  }

  const hash = bcrypt.hashSync(data.password, 12)

   const newUser = getRepository(User).create({email: data.email, password: hash})
   await getRepository(User).save(newUser)
  
  return "Ok";
}

export async function verifyEmailAvailability(email: string){
  const emailInUse = await getRepository(User).find({where: {email: email}})
  if(emailInUse.length){
    return true
  }else{
    return false
  }
}

export async function registerSession(data: userData){
  const userPassword = await getRepository(User).find({where: {email: data.email}})

  if(bcrypt.compareSync(data.password, userPassword[0].password)){
    const token = uuidv4()

    const user = await getRepository(User).findOne({where: {email: data.email}})

    const session = getRepository(Session).create({
      user: user,
      token: token
    })

    await getRepository(Session).save(session)
    return token
  }
  return null
}
