const connectDB = require('./mongo.js');
const app = require('./app') // The Express app
const config = require('./utils/config')
const logger = require('./utils/logger')

// Connect to  server
app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})

