const connectDB = require('./mongo.js');
const app = require('./app') // The Express app
const config = require('./utils/config')
const logger = require('./utils/logger')
// Connect to DB then start server
const PORT = config.PORT
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}
)

