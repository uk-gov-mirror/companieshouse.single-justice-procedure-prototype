const utils = require('../../lib/utils.js')

module.exports = function (router) {
  // ACCEPT/REJECT DECISION SCREEN
  router.get('/case/decision', function (req, res) {
    var id = req.query.id
    res.render('case/decision', {
      case: req.session.cases[id]
    })
  })
  router.post('/case/decision', function (req, res) {
    var id = req.body.caseID
    var caseAction = req.body.caseAction
    var event = {}
    var date = new Date()
    var offenceList = req.body.offenceList
    var i = 0
    var splitOffences = []

    if (caseAction === 'accept') {
      event.date = date.getDate()
      event.time = date.getTime()
      event.title = 'Case accepted'
      event.user = 'system'
      event.notes = ''
      req.session.cases[id].history.push(event)
      req.session.cases[id].status = 'Accepted'
      if (offenceList === '_unchecked') {
      } else {
        for (i = 0; i < offenceList.length; i++) {
          splitOffences = offenceList[i].split('-')
          req.session.cases[id].defendants[splitOffences[0]].offences[splitOffences[1]].status = 'proceed'
        }
      }
      if (req.body.proceedAgainstCompany !== '_unchecked') {
        req.session.cases[id].proceedAgainstCompany = true
      }
      res.redirect('/case/overview?id=' + id)
    } else {
      event.date = date.getDate()
      event.time = date.getTime()
      event.title = 'Case rejected'
      event.user = 'system'
      event.notes = ''
      req.session.cases[id].history.push(event)
      req.session.cases[id].status = 'Rejected'
      res.redirect('/cases/referrals')
    }
  })

  // CASE OVERVIEW
  router.get('/case/overview', function (req, res) {
    var id = req.query.id
    req.session.recents.push(id)
    res.render('case/overview', {
      case: req.session.cases[id],
      navTabListOverview: 'section-navigation__item--active',
      navTabLinkOverview: 'section-navigation__link--active'
    })
  })
  // CASE PROFILE
  router.get('/case/company-profile', function (req, res) {
    var id = req.query.id
    res.render('case/company-profile', {
      case: req.session.cases[id],
      navTabListProfile: 'section-navigation__item--active',
      navTabLinkProfile: 'section-navigation__link--active'
    })
  })
  // CASE DEFENDANTS
  router.get('/case/defendants', function (req, res) {
    var id = req.query.id
    var proceedMessage = ''
    var totalDefendants = 0
    var totalOffences = 0
    var i = 0
    var j = 0

    for (i = 0; i < req.session.cases[id].defendants.length; i++) {
      totalDefendants++
      for (j = 0; j < req.session.cases[id].defendants[i].offences.length; j++) {
        totalOffences++
      }
    }
    if (req.session.cases[id].proceedAgainstCompany === true) {
      proceedMessage = 'the company'
    } else {
      proceedMessage = totalDefendants + ' defendants with ' + totalOffences + ' offences'
    }

    res.render('case/defendants', {
      case: req.session.cases[id],
      navTabListDefendants: 'section-navigation__item--active',
      navTabLinkDefendants: 'section-navigation__link--active',
      proceedMessage: proceedMessage
    })
  })
  // CASE HISTORY
  router.get('/case/history', function (req, res) {
    var id = req.query.id
    res.render('case/history', {
      case: req.session.cases[id],
      navTabListHistory: 'section-navigation__item--active',
      navTabLinkHistory: 'section-navigation__link--active'
    })
  })
}
