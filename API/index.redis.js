import express from 'express';
import fetch from 'node-fetch';
import { createClient } from 'redis';

const port = process.env.PORT || 5050;
const redis_port = 6379;

const app = express();

const client = createClient({
    port: redis_port,
});

await client.connect();

// set response 
function setResponse(username, repos) {
    return `<h2>${username} has ${repos} Github repos!!! </h2>`;
}

// cache middleware
const userCache = async (req, res, next) => {
    try {
        const { username } = req.params;
        const data = await client.get(username);

        if (data) {
            res.send(setResponse(username, data))
        }
        else {
            next();
        }

    } catch (error) {
        console.log(error);
    }
}

async function getRepos(req, res, next) {
    try {
        console.log('fetching data...');

        const { username } = req.params;
        const response = await fetch(`http://api.github.com/users/${username}`)

        const data = await response.json();

        const repos = data.public_repos;

        // set data to redis
        await client.SET(username, repos);
        await client.EXPIRE(username, 200);

        res.send(setResponse(username, repos));

    } catch (error) {
        console.log('error fetching data', error);
    }
}

app.get('/repos/:username', userCache, getRepos);

app.listen(port, () => {
    console.log('listening on port ' + port)
});