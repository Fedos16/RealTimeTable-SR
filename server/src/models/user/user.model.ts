import mongoose from "mongoose"
import { IUser } from "./user.types"

const userSchema = new mongoose.Schema<IUser>({
    name: { type: String, require: true },
    surname: { type: String, require: true },
    age: { type: Number, require: true }
})

export const User = mongoose.model('user', userSchema)
