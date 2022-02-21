require('dotenv').config()
var redis = require("redis");


async function bootstrap() {
    const redisCacheHostName = process.env.REDISCACHEHOSTNAME
    const redisCacheKey = process.env.REDISCACHEKEY

    const client = redis.createClient({
        url: `redis://${redisCacheHostName}:6379`,
        password: redisCacheKey,
        database: 2
    });
    await client.connect();
    const x = await Promise.all([
        client.set('key', 'value'),
        client.set('key2', 'value'),
        client.set('key3', 'value')
    ])
    console.log('SET', x)

    const y = await Promise.all([
        client.get('key'),
        client.get('key2'),
        client.get('key3')
    ])
    console.log('GET', y)

    await client.disconnect()
}

bootstrap()
