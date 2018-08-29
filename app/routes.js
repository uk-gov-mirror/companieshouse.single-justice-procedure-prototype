const express = require('express')
const router = express.Router()

// Service Core
require('./routes/core.js')(router)
// Main Journey
// require('./routes/journey.js')(router)
require('./routes/actions.js')(router)

module.exports = router
