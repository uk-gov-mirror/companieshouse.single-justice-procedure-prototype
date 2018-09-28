module.exports = function (router) {
  // Referrals screen
  router.get('/cases/referrals', function (req, res) {
    var totalReferredCases = 0
    var i = 0

    for (i = 0; i < req.session.cases.length; i++) {
      if (req.session.cases[i].status === 'Referred') {
        totalReferredCases++
      }
    }
    res.render('cases/referrals', {
      cases: req.session.cases,
      totalReferredCases: totalReferredCases,
      referredLinkActive: 'section-navigation__link--active'
    })
  })

  // Accepted screen
  router.get('/cases/accepted', function (req, res) {
    var totalAcceptedCases = 0
    var i = 0

    for (i = 0; i < req.session.cases.length; i++) {
      if (req.session.cases[i].status === 'Accepted') {
        totalAcceptedCases++
      }
    }
    res.render('cases/accepted', {
      cases: req.session.cases,
      totalAcceptedCases: totalAcceptedCases,
      acceptedLinkActive: 'section-navigation__link--active'
    })
  })

  // Rejected screen
  router.get('/cases/rejected', function (req, res) {
    var totalRejectedCases = 0
    var i = 0

    for (i = 0; i < req.session.cases.length; i++) {
      if (req.session.cases[i].status === 'Rejected') {
        totalRejectedCases++
      }
    }
    res.render('cases/rejected', {
      cases: req.session.cases,
      totalRejectedCases: totalRejectedCases,
      rejectedLinkActive: 'section-navigation__link--active'
    })
  })

  // Bookmarks
  router.get('/cases/bookmarks', function (req, res) {
    res.render('cases/bookmarks', {
      cases: req.session.cases
    })
  })
}
