const express = require('express')
const { engine } = require('express-handlebars')

const app = express()

const conn = require('./db/conn')

const Task = require('./models/Task')

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

const taskRoutes = require('./routes/taskRoutes')
app.use('/tasks', taskRoutes)

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.use(express.static('public'))

conn.sync()
    .then(() => {
        app.listen(3000)
    })
    .catch((error) => console.log(error))