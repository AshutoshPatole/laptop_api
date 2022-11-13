import ExpressRedisCache from 'express-redis-cache';

const cache = ExpressRedisCache({
    expire: 3600, // optional: expire every 10 seconds
  })

export default cache;