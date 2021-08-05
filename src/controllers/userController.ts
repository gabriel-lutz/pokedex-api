import { Request, Response } from "express";

import * as userService from "../services/userService";

export async function registerUser (req: Request, res: Response) {
    const userData = req.body

    const emailInUse = await userService.verifyEmailAvailability(userData.email)
    if(emailInUse){
      return res.sendStatus(409)
    }

    const result = await userService.validatePasswordAndCreateHash(userData)
    if(result === null){
      return res.sendStatus(400)
    }

    return res.sendStatus(201);
}

export async function loginUser(req:Request, res: Response){
  const userData = req.body

  const 
}