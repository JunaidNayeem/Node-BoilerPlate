require('dotenv').config()
let express = require('./config/express')
let db = require('./config/mongoose')
let app = express()
const port = process.env.PORT || 8000;
console.log(port)
app.listen(port, () => {
    console.log(`Magic Happens at port ${port}`)
})
