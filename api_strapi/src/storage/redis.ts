const Redis = require("ioredis");

console.log("process.env", process.env.REDIS_HOST);
const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  username: 'default',
  db: 0,
});

export {
  redis
}
