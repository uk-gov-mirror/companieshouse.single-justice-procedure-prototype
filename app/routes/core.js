module.exports = function (router) {
  // Route index page
  router.get('/', function (req, res) {
    req.session.regenerate(function (err) {
      if (err) {

      }
    })
    req.session.cases = require('../data/cases.js')
    res.render('cases', {
      cases: req.session.cases
    })
  })
}
