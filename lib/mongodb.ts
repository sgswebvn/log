import { MongoClient } from 'mongodb'

if (!process.env.MONGODB_URI) {
  throw new Error('Vui lòng thêm MONGODB_URI vào file .env.local')
}

const uri = process.env.MONGODB_URI
const options = {}

let client
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
  // Trong môi trường development, sử dụng global variable để tránh tạo nhiều kết nối
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri, options)
    ;(global as any)._mongoClientPromise = client.connect()
  }
  clientPromise = (global as any)._mongoClientPromise
} else {
  // Trong production, tạo kết nối mới
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise
