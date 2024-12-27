// import Redis from "ioredis"
// import dotenv from "dotenv";

// dotenv.config({
// })

// const redis = new Redis(process.env.UPSTASH_REDIS_URL);
// await redis.set('b', 'lal');

import Redis from "ioredis"

export const redis = new Redis("rediss://default:AW8nAAIjcDE0ODJlMGUyY2E4Nzk0Yjg0OTgyNDlhMWFiY2JiYTk4NHAxMA@peaceful-dodo-28455.upstash.io:6379");