module.exports = function (router) {
  // Route index page
  router.get('/', function (req, res) {
    var realCases = require('../data/cases.js')
    var fakeCases = require('../data/fake-cases.js')

    req.session.cases = realCases.concat(fakeCases)
    req.session.recents = []
    req.session.notifications = {}
    req.session.notifications.list = []
    res.render('account/login')
  })

  router.all('*', function (req, res, next) {
    if (typeof req.session.cases === 'undefined') {
      // console.log('cases not loaded')
      return res.redirect('/')
    }
    next()
  })

  // Bookmarks
  router.get('/cases/bookmarks', function (req, res) {
    res.render('cases/bookmarks', {
      cases: req.session.cases
    })
  })
}
