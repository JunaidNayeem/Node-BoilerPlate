const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const path = require('path')
const routers = require('../routers/index')
const async = require('async');

module.exports = () => {
    let app = express()
    app.use([
        cors(),
        cookieParser(),
        express.static('./data', {
            maxAge: '1d'
        }),
        bodyParser.json({ limit: '50mb' }),
		bodyParser.urlencoded({ limit: '50mb', extended: true }),
        multer().any()
    ])
    // require('../routers/index')
    routers(app)
    // app.use('/admin', require('../routers/admin.routers'))
    return app
}