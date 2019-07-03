const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

// Service Core
require('./routes/core.js')(router)

// CASES VIEWS
require('./routes/cases.js')(router)

// CASE VIEWS
require('./routes/case.js')(router)

// WORKFLOWS
require('./routes/workflows/accept-case.js')(router)

// AJAX ACTIONS
require('./routes/actions.js')(router)

module.exports = router
