import { Router } from "express"
import {getUsers} from "../../services/user";

const router = Router()

router.get('/user', getUsers)

export {
    router
}
