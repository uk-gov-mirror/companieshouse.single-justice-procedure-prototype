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
  router.get('/cases/ultimatum', function (req, res) {
    var totalUltimatumCases = 0
    var i = 0

    for (i = 0; i < req.session.cases.length; i++) {
      if (req.session.cases[i].status === 'Accepted' || req.session.cases[i].status === 'Ultimatum issued') {
        totalUltimatumCases++
      }
    }
    res.render('cases/ultimatum', {
      cases: req.session.cases,
      totalUltimatumCases: totalUltimatumCases,
      ultimatumLinkActive: 'section-navigation__link--active'
    })
  })

  // SJPN screen
  router.get('/cases/sjpn', function (req, res) {
    var totalSJPNCases = 0
    var i = 0

    for (i = 0; i < req.session.cases.length; i++) {
      if (req.session.cases[i].status === 'Ultimatum expired' || req.session.cases[i].status === 'SJPN issued') {
        totalSJPNCases++
      }
    }
    res.render('cases/sjpn', {
      cases: req.session.cases,
      totalSJPNCases: totalSJPNCases,
      sjpnLinkActive: 'section-navigation__link--active'
    })
  })

  // Outcomes screen
  router.get('/cases/outcomes', function (req, res) {
    console.log(req.session.cases)
    var totalOutcomeCases = 0
    var i = 0

    for (i = 0; i < req.session.cases.length; i++) {
      if (req.session.cases[i].status === 'Awaiting outcomes' || req.session.cases[i].status === 'Outcomes added') {
        totalOutcomeCases++
      }
    }
    res.render('cases/outcomes', {
      cases: req.session.cases,
      totalOutcomeCases: totalOutcomeCases,
      outcomeLinkActive: 'section-navigation__link--active'
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
