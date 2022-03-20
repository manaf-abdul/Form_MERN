import express from 'express';
import path from 'path'
import dotenv from 'dotenv';
import connectDB from './Config.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import userRoutes from './Routes/userRoutes.js'
import categoryRoutes from './Routes/categoryRoutes.js'
import cors from 'cors'
import fileupload from 'express-fileupload'
import cloudinary from 'cloudinary'
import bodyparser from 'body-parser'

//configuring environment variables
dotenv.config()

const app = express()

//connecting databse
connectDB()

//setting up cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})  

app.use(express.json( {limit: "50mb"} ))
app.use(bodyparser.urlencoded({limit:'50mb',extended: true }))
app.use(cors())
app.use(fileupload());


//importing and using routes
app.use('/api/users', userRoutes)
app.use('/api/category',categoryRoutes)

const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

//error handling
app.use(notFound)
app.use(errorHandler)

app.listen(process.env.PORT, console.log('Server Connected'))