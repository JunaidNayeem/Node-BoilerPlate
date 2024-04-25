const express = require('express')
app = express()
const path = require('path')

module.exports = app => {
    // Routes

    app.use('/assets', express.static(path.join('./data')));
}