import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import { productRouter } from './routers/productRouter'
import { seedRouter } from './routers/seedRouter'
import { userRouter } from './routers/userRouter'
import { orderRouter } from './routers/orderRouter'
import { keyRouter } from './routers/keyRouter'
import { Request, Response } from 'express'

dotenv.config()

//const MONGODB_URI =
//  process.env.MONGODB_URI || 'mongodb://localhost/ecommercedb'
const MONGODB_URI: string = 
  (process.env.NODE_ENV === 'production'
  ? process.env.MONGODB_URI_PROD
  : process.env.MONGODB_URI) as string || 'mongodb://localhost/ecommercedb';

mongoose.set('strictQuery', true)

mongoose
.connect(MONGODB_URI)
.then(() => {
  console.log('connected to mongodb')
})
.catch((error) => {
  console.log('error connecting to mongodb mongodb:', error)
})

const app = express()
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173'],
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/orders', orderRouter)
app.use('/api/seed', seedRouter)
app.use('/api/keys', keyRouter)

app.use(express.static(path.join(__dirname, '../../frontend/dist')))
app.get('*', (req: Request, res: Response) =>
res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'))
)

const PORT: number = parseInt((process.env.PORT || '4000') as string, 10)

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`)
})