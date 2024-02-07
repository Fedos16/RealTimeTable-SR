import { Server, Socket } from "socket.io"
import { ETableEvents } from "./table.types"
import { Column, IColumn } from "../../models/column"
import {IUser, User} from "../../models/user"

export const configureTableSocket = (io: Server, socket: Socket) => {
    socket.on(ETableEvents.ADD_COLUMN, async (columnData: IColumn) => {
        try {
            const newColumn = new Column(columnData)
            await newColumn.save()
            io.emit(ETableEvents.COLUMN_ADDED, newColumn)
        } catch (error) {
            console.error('Error adding column:', error)
        }
    })
    socket.on(ETableEvents.REMOVE_COLUMN, async (columnId: string) => {
        try {
            await Column.findByIdAndDelete(columnId)
            io.emit(ETableEvents.COLUMN_REMOVED, columnId)
        } catch (error) {
            console.error('Error removing column:', error)
        }
    })
    socket.on(ETableEvents.EDIT_COLUMN, async (columnData: IColumn) => {
        try {
            const updatedColumn = await Column.findByIdAndUpdate(columnData._id, columnData, { new: true })
            io.emit(ETableEvents.COLUMN_EDITED, updatedColumn)
        } catch (error) {
            console.error('Error editing column:', error)
        }
    })
    socket.on(ETableEvents.ADD_ROW, async (userData: IUser) => {
        try {
            const newUser = new User(userData)
            await newUser.save()
            io.emit(ETableEvents.ROW_ADDED, newUser)
        } catch (error) {
            console.error('Error adding row:', error)
        }
    })
    socket.on(ETableEvents.REMOVE_ROW, async (userId: string) => {
        try {
            await User.findByIdAndDelete(userId)
            io.emit(ETableEvents.ROW_REMOVED, userId)
        } catch (error) {
            console.error('Error removing row:', error)
        }
    })
    socket.on(ETableEvents.EDIT_ROW, async (userData: IUser) => {
        try {
            const updatedUser = await User.findByIdAndUpdate(userData._id, userData, { new: true })
            io.emit(ETableEvents.ROW_EDITED, updatedUser)
        } catch (error) {
            console.error('Error editing row:', error)
        }
    })
}
