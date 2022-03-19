import express from 'express';
import dotenv from 'dotenv';
import connectDB from './Config.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import userRoutes from './Routes/userRoutes.js'
import cors from 'cors'

dotenv.config()
const app = express()
connectDB()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('API running')
})

app.use('/api/users', userRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(process.env.PORT, console.log('Server Connected'))