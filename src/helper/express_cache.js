import ExpressRedisCache from 'express-redis-cache'

const cache = ExpressRedisCache({
    host: "redis-cache",
    expire: 300,
})

export default cache
