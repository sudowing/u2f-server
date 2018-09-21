import { promisify } from 'util'
import * as knex from 'knex'
import * as redis from 'redis'

export const db = knex({ client: 'pg', connection: process.env.DB_URL })

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || 'localhost',
  port: 6379
})
redisClient.on('error', function (err) {
  console.log('error | redisClient')
  console.log(err)
})

export const  cache = {
  get: promisify(redisClient.get).bind(redisClient),
  set: promisify(redisClient.set).bind(redisClient),
}