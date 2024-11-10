const connectToMongo = require('./db')
const express = require('express')
var cors = require('cors')

connectToMongo();
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

//available routes
app.use('/api/notes/', require('./routes/route'))

const server = app.listen(port, () => {
  console.log(`Task Management backend listening on port ${port}`)
})

module.exports = server; // Export the server for testing