
'use strict';
const express = require('express');
const router = express.Router();

const upload = require('../helpers/upload')

class Router {
    registerRouter() {

        router.post('/upload', upload.single('file'), (req, res) => {
            if (req.file === undefined) return res.send('Use must select a file!');
            const imgUrl = `http://localhost:5000/file/${req.file.filename}`;
            return res.send(imgUrl);
        })
        return router;

    }
}

module.exports = new Router().registerRouter();