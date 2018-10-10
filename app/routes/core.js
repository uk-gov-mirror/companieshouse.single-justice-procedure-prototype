module.exports = function (router) {
  // Route index page
  router.get('/', function (req, res) {
    req.session.cases = require('../data/cases.js')
    res.render('account/login')
  })

  // Referrals screen
  router.get('/cases/referrals', function (req, res) {
    res.render('cases/referrals', {
      cases: req.session.cases
    })
  })

  // ACCEPT/REJECT DECISION SCREEN
  router.get('/case/decision', function (req, res) {
    console.log(req.session.cases)
    var id = req.query.id
    res.render('case/decision', {
      case: req.session.cases[id]
    })
  })

  // Bookmarks
  router.get('/cases/bookmarks', function (req, res) {
    res.render('cases/bookmarks', {
      cases: req.session.cases
    })
  })
}
