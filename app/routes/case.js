module.exports = function (router) {
  // ACCEPT/REJECT DECISION SCREEN
  router.get('/case/decision', function (req, res) {
    var id = req.query.id
    var casetab = req.query.casetab
    var companytab = req.query.companytab

    res.render('case/decision', {
      case: req.session.cases[id],
      casetab: casetab,
      companytab: companytab
    })
  })
  router.post('/case/decision', function (req, res) {
    var id = req.body.caseID
    var caseAction = req.body.caseAction
    var useAddress = req.body.useAddress
    var defendantID = parseInt(req.body.defendantID)
    var casetab = req.query.casetab
    var companytab = req.query.companytab
    var event = {}
    var date = new Date()
    var offenceList = req.body.offenceList
    var i = 0
    var splitOffences = []
    var notifications = {}

    if (caseAction === 'accept') {
      if (offenceList === '_unchecked') {
        notifications.list = []
        notifications.title = 'You forgot something'
        notifications.list.push('You need to select at least 1 offence to accept a case')

        res.render('case/decision', {
          case: req.session.cases[id],
          casetab: casetab,
          companytab: companytab,
          notifications: notifications
        })
      } else {
        event.date = date.getDate()
        event.time = date.getTime()
        event.title = 'Case accepted'
        event.user = 'system'
        event.notes = ''
        req.session.cases[id].history.push(event)
        req.session.cases[id].status = 'Accepted'
        for (i = 0; i < offenceList.length; i++) {
          splitOffences = offenceList[i].split('-')
          req.session.cases[id].defendants[splitOffences[0]].offences[splitOffences[1]].status = 'proceed'
        }
        res.redirect('/case/overview?id=' + id)
      }
    } else if (useAddress !== '') {
      notifications.list = []
      if (useAddress === 'service') {
        req.session.cases[id].defendants[defendantID].addressType = 'service'
        req.session.cases[id].defendants[defendantID].address.line1 = req.session.cases[id].company.officers[defendantID].serviceAddress.line1
        req.session.cases[id].defendants[defendantID].address.line2 = req.session.cases[id].company.officers[defendantID].serviceAddress.line2
        req.session.cases[id].defendants[defendantID].address.town = req.session.cases[id].company.officers[defendantID].serviceAddress.town
        req.session.cases[id].defendants[defendantID].address.county = req.session.cases[id].company.officers[defendantID].serviceAddress.county
        req.session.cases[id].defendants[defendantID].address.postcode = req.session.cases[id].company.officers[defendantID].serviceAddress.postcode
        req.session.cases[id].defendants[defendantID].address.country = req.session.cases[id].company.officers[defendantID].serviceAddress.country
        notifications.title = 'The case has been updated'
        notifications.list.push('The service address is now being used for ' + req.session.cases[id].defendants[defendantID].name)
      }
      if (useAddress === 'residential') {
        req.session.cases[id].defendants[defendantID].addressType = 'residential'
        req.session.cases[id].defendants[defendantID].address.line1 = req.session.cases[id].company.officers[defendantID].residentialAddress.line1
        req.session.cases[id].defendants[defendantID].address.line2 = req.session.cases[id].company.officers[defendantID].residentialAddress.line2
        req.session.cases[id].defendants[defendantID].address.town = req.session.cases[id].company.officers[defendantID].residentialAddress.town
        req.session.cases[id].defendants[defendantID].address.county = req.session.cases[id].company.officers[defendantID].residentialAddress.county
        req.session.cases[id].defendants[defendantID].address.postcode = req.session.cases[id].company.officers[defendantID].residentialAddress.postcode
        req.session.cases[id].defendants[defendantID].address.country = req.session.cases[id].company.officers[defendantID].residentialAddress.country
        notifications.title = 'The case has been updated'
        notifications.list.push('The residential address is now being used for ' + req.session.cases[id].defendants[defendantID].name)
      }
      res.render('case/decision', {
        case: req.session.cases[id],
        casetab: casetab,
        companytab: companytab,
        notifications: notifications
      })
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
  // REJECT CASE
  router.post('/case/reject-reason', function (req, res) {
    var id = req.body.caseID
    var action = req.body.caseAction
    var referral = req.session.cases[id]
    var event = {}
    var date = new Date()
    var rejectReason = ''
    var backLink = '/case/decision?id=' + id + '&casetab=overview&companytab=overview'

    if (action === 'reason') {
      res.render('case/reject-reason', {
        case: referral,
        id: id,
        action: action,
        backLink: backLink
      })
    }
    if (action === 'reject') {
      rejectReason = req.body.rejectReason
      event.date = date.getDate()
      event.time = date.getTime()
      event.title = 'Case rejected'
      event.user = 'system'
      event.notes = 'Reject reason: ' + rejectReason
      req.session.cases[id].history.push(event)
      req.session.cases[id].status = 'Rejected'
      req.session.cases[id].rejectReason = rejectReason
      res.redirect('/cases/referrals')
    }
  })
}
