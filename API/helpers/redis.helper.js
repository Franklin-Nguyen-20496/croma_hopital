
const { createClient } = require('redis');
const redis = createClient();

(async function setup() {
    try {
        redis.on("error", (err) => console.log("Redis Client Error", err));
        await redis.connect();
    } catch (error) {
        console.log(error)
    }
})();

module.exports = redis;