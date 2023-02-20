import ExpressRedisCache from 'express-redis-cache';

const cache = ExpressRedisCache({
  // host: "redis-cache",   // Docker
  host: 'localhost', // Development local
  expire: 300,
});

export default cache;
