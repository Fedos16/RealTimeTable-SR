import mongoose from "mongoose"
import { IColumn } from "./column.types"

const columnSchema = new mongoose.Schema<IColumn>({
    name: { type: String, require: true },
    field: { type: String, require: true },
    tableType: { type: Number, require: true }
})

export const Column = mongoose.model('column', columnSchema)
