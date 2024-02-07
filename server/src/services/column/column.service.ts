import type { Request, Response } from 'express'
import {Column, ETableType} from "../../models/column";

export const getColumnsByColumnType = async (request: Request, response: Response) => {
    const tableType = parseInt(request.query.type as string || '0') as ETableType
    return response.json(await Column.find({ tableType }).lean())
}
