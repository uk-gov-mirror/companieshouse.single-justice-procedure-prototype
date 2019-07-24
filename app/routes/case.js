module.exports = function (router) {
  router.get('/case/page-one/', function (req, res) {
    var id = parseInt(req.query.id)
    var i = 0

    for (i = 0; i < req.session.cases.length; i++) {
      if (req.session.cases[i].id === id) {
        req.session.workingCase = req.session.cases[i]
      }
    };
    res.render('case/page-one', {
      case: req.session.cases[id]
    })
  })
  // CASE OVERVIEW
  router.get('/case/overview', function (req, res) {
    var id = parseInt(req.query.id)
    req.session.recents.push(id)
    res.render('case/overview', {
      case: req.session.cases[id]
    })
  })
  // CASE PROFILE
  router.get('/case/page-one/', function (req, res) {
    var id = req.query.id

    res.render('case/page-one/', {
      case: req.session.cases[id],
      navTabListProfile: 'section-navigation__item--active',
      navTabLinkProfile: 'section-navigation__link--active'
    })
  })

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
        // notificationList.push(notification)
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
}
