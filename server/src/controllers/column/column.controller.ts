import { Router } from 'express'
import {getColumnsByColumnType} from "../../services/column";

const router = Router()

router.get('/column/by-type', getColumnsByColumnType)

export {
    router
}
