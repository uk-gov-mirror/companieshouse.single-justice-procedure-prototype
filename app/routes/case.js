module.exports = function (router) {
  // ACCEPT/REJECT DECISION SCREEN
  router.get('/case/decision', function (req, res) {
    var id = req.query.id
    var caseTab = 'section-navigation__link--active'
    var companyTab = 'section-navigation__link--active'

    res.render('case/decision', {
      case: req.session.cases[id],
      caseOverviewTab: caseTab,
      companyOverviewTab: companyTab
    })
  })
  router.post('/case/decision', function (req, res) {
    var id = req.body.caseID
    var caseAction = req.body.caseAction
    var useAddress = req.body.useAddress
    var defendantID = parseInt(req.body.defendantID)
    var caseTab = 'section-navigation__link--active'
    var companyTab = 'section-navigation__link--active'
    var date = new Date()
    var offenceList = req.body.offenceList
    var i = 0
    var splitOffences = []
    var notification = {}
    var event = {}
    var notificationList = []

    if (caseAction === 'accept') {
      if (offenceList === '_unchecked') {
        notification.text = 'You need to select at least 1 offence to accept a case'
        notification.href = '#offence-0-0'
        req.session.notifications.title = 'There was a problem accepting this case'
        notificationList.push(notification)
        req.session.notifications.list = notificationList

        res.render('case/decision', {
          case: req.session.cases[id],
          caseOffencesTab: caseTab,
          companyOverviewTab: companyTab,
          notifications: req.session.notifications,
          notificationType: 'error'
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

        req.session.notifications.title = 'Case accepted'
        req.session.notifications.list = notificationList
        res.redirect('/case/ultimatum?id=' + id)
      }
    } else if (useAddress !== '') {
      if (useAddress === 'service') {
        req.session.cases[id].defendants[defendantID].addressType = 'service'
        req.session.cases[id].defendants[defendantID].address.line1 = req.session.cases[id].company.officers[defendantID].serviceAddress.line1
        req.session.cases[id].defendants[defendantID].address.line2 = req.session.cases[id].company.officers[defendantID].serviceAddress.line2
        req.session.cases[id].defendants[defendantID].address.town = req.session.cases[id].company.officers[defendantID].serviceAddress.town
        req.session.cases[id].defendants[defendantID].address.county = req.session.cases[id].company.officers[defendantID].serviceAddress.county
        req.session.cases[id].defendants[defendantID].address.postcode = req.session.cases[id].company.officers[defendantID].serviceAddress.postcode
        req.session.cases[id].defendants[defendantID].address.country = req.session.cases[id].company.officers[defendantID].serviceAddress.country
        req.session.notifications.title = 'The case has been updated'
        notification.text = 'The service address is now being used for ' + req.session.cases[id].defendants[defendantID].name
        notificationList.push(notification)
        req.session.notifications.list = notificationList
      }
      if (useAddress === 'residential') {
        req.session.cases[id].defendants[defendantID].addressType = 'residential'
        req.session.cases[id].defendants[defendantID].address.line1 = req.session.cases[id].company.officers[defendantID].residentialAddress.line1
        req.session.cases[id].defendants[defendantID].address.line2 = req.session.cases[id].company.officers[defendantID].residentialAddress.line2
        req.session.cases[id].defendants[defendantID].address.town = req.session.cases[id].company.officers[defendantID].residentialAddress.town
        req.session.cases[id].defendants[defendantID].address.county = req.session.cases[id].company.officers[defendantID].residentialAddress.county
        req.session.cases[id].defendants[defendantID].address.postcode = req.session.cases[id].company.officers[defendantID].residentialAddress.postcode
        req.session.cases[id].defendants[defendantID].address.country = req.session.cases[id].company.officers[defendantID].residentialAddress.country
        req.session.notifications.title = 'The case has been updated'
        notification.text = 'The residential address is now being used for ' + req.session.cases[id].defendants[defendantID].name
        notificationList.push(notification)
        req.session.notifications.list = notificationList
      }
      res.render('case/decision', {
        case: req.session.cases[id],
        caseOffencesTab: caseTab,
        companyOverviewTab: companyTab,
        notifications: req.session.notifications,
        notificationType: 'notify'
      })
    } else {

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
  // ULTIMATUM
  router.get('/case/ultimatum', function (req, res) {
    var id = req.query.id

    res.render('case/ultimatum', {
      case: req.session.cases[id],
      navTabListUltimatum: 'section-navigation__item--active',
      navTabLinkUltimatum: 'section-navigation__link--active',
      notifications: req.session.notifications
    })
  })
  router.post('/case/ultimatum', function (req, res) {
    var id = req.body.caseID
    var action = req.body.caseAction
    var referral = req.session.cases[id]
    var event = {}
    var date = new Date()

    if (action === 'issueUltimatum') {
      event.date = date.getDate()
      event.time = date.getTime()
      event.title = 'Ultimatum issued'
      event.user = 'system'
      event.notes = 'Ultimatum sent to the defendant'
      req.session.cases[id].history.push(event)
      req.session.cases[id].status = 'Ultimatum issued'
      res.redirect('/case/overview?id=' + id)
    }
    if (action === 'reissueUltimatum') {
      event.date = date.getDate()
      event.time = date.getTime()
      event.title = 'Ultimatum reissued'
      event.user = 'system'
      event.notes = 'Updated ultimatum letter sent to defendant'
      req.session.cases[id].history.push(event)
      req.session.cases[id].status = 'Ultimatum issued'
      res.redirect('/case/overview?id=' + id)
    }
    if (action === 'expireUltimatum') {
      event.date = date.getDate()
      event.time = date.getTime()
      event.title = 'Ultimatum reissued'
      event.user = 'system'
      event.notes = 'Updated ultimatum letter sent to defendant'
      req.session.cases[id].history.push(event)
      req.session.cases[id].status = 'Ultimatum issued'
      res.redirect('/case/overview?id=' + id)
    }
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
    var backLink = '/case/decision?id=' + id

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
      res.redirect('/cases/rejected')
    }
  })
}
