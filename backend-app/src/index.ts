import mongoose from 'mongoose'
import startServer from './server'
import dotenv from 'dotenv'
dotenv.config()

const start = async () => {
  try {
    console.log(process.env.MONGO_URL)

    // if (process.env.NODE_ENV !== 'production') {
    //   process.env.JWT_KEY = process.env.JWT_KEY || 'secreto'
    // } else {
    //   if (!process.env.JWT_KEY) {
    //     throw new Error('JWT_KEY must be defined')
    //   }
    //   if (!process.env.MONGO_URL) {
    //     throw new Error('MONGO_URL must be defined')
    //   }
    // }
    const options = {
      autoIndex: false, // Don't build indexes
      maxPoolSize: 20, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000 // Close sockets after 45 seconds of inactivity
    }
    if (!process.env.MONGO_URL) {
      throw new Error('MONGO_URL must be defined')
    }
    // await mongoose.connect('mongodb+srv://user_node:Vkvw4ECQ5QxGn0un@miclustercafe.fwx4cd2.mongodb.net/el-sao', options)
    await mongoose.connect(process.env.MONGO_URL, options)
    console.log('mongodb connected')
    console.log('ENV: ', process.env.NODE_ENV)
    await startServer()
  } catch (error) {
    console.error(error)
  }
}

start()
