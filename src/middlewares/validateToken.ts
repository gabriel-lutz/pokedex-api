import {Request, Response, NextFunction} from "express"
import Session from "../entities/Session"
import { getRepository } from "typeorm"

export async function validateToken(req:Request, res:Response, next: NextFunction){
    const authorization = req.headers.authorization
    if(!authorization) return res.sendStatus(401)
    const token = authorization.split("Bearer ")[1]

    const session = await getRepository(Session).findOne({where: {token: token}, relations:["user"]})
    if(!session) return res.sendStatus(401)

    res.locals.token = token
    res.locals.id = session.user.id

    next()
}