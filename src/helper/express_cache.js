import ExpressRedisCache from 'express-redis-cache';

const cache = ExpressRedisCache({
    expire: 600,
  })

export default cache;