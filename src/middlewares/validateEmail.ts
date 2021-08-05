import { emailSchema } from "../schemas"
import {Request, Response, NextFunction} from "express"

export function validateSignupBody(req:Request, res:Response, next: NextFunction){
    const data = req.body
    if(emailSchema.validate(data).error){
        return res.sendStatus(400)
    }
    next()
}