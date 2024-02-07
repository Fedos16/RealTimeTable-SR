import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import bodyParser from 'body-parser'
import { configureSocketIo } from "./socket"
import { router as userRouter } from './controllers/user'
import { router as columnRouter } from './controllers/column'

const app = express();
const server = createServer(app)

dotenv.config()

app.use(cors({
    origin: 'http://localhost:5173'
}))

void mongoose.connect(process.env.MONGODB_URI || '');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

export const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173'
    }
})
configureSocketIo(io)

app.use(bodyParser.json())

app.use(userRouter)
app.use(columnRouter)

const PORT = process.env.PORT || 3000;

server.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
})
