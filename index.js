const express = require('express')
const app = express()
app.use(express.json());

const cors = require('cors')
const connectDB = require('./mongo.js');
require('dotenv').config();


app.use(cors())

const blogsRouter = require('./controllers/blogs.js')
app.use('/api/blogs', blogsRouter)


// Connect to DB then start server
const PORT = 3003
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}
)

