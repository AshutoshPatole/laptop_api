import ExpressRedisCache from 'express-redis-cache';

const cache = ExpressRedisCache({
    expire: 300,
  })

export default cache;