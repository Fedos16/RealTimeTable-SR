import {Request, Response} from "express";
import {User} from "../../models/user";

export const getUsers = async (_: Request, response: Response) => {
    return response.json(await User.find({}).lean())
}
