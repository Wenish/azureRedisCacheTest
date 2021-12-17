require('dotenv').config()
var redis = require("redis");


async function bootstrap() {
    // Add your cache name and access key.
    var client = redis.createClient({
        url: `redis://${process.env.REDISCACHEHOSTNAME}:6379`,
        password: process.env.REDISCACHEKEY
    });
    await client.connect();
    await client.set('key', 'value')
    const value = client.select('key')
    console.log(value)
}

bootstrap()
