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
      res.redirect('/cases/referrals')
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
      event.title = 'Ultimatum expired'
      event.user = 'system'
      event.notes = 'Ultimatum period expired without response'
      req.session.cases[id].history.push(event)
      req.session.cases[id].status = 'Ultimatum expired'
      res.redirect('/cases/referrals')
    }
  })
  // SJPN
  router.get('/case/sjpn', function (req, res) {
    var id = req.query.id

    res.render('case/sjpn', {
      case: req.session.cases[id],
      navTabListSJPN: 'section-navigation__item--active',
      navTabLinkSJPN: 'section-navigation__link--active'
    })
  })
  router.post('/case/sjpn', function (req, res) {
    var id = req.body.caseID
    var action = req.body.caseAction
    var referral = req.session.cases[id]
    var event = {}
    var date = new Date()

    if (action === 'issueSJPN') {
      event.date = date.getDate()
      event.time = date.getTime()
      event.title = 'SJPN issued'
      event.user = 'system'
      event.notes = 'SJPN issued to defendant and queued for delivery to court'
      req.session.cases[id].history.push(event)
      req.session.cases[id].status = 'SJPN issued'
      res.redirect('/cases/referrals')
    }
    if (action === 'expireSJPN') {
      event.date = date.getDate()
      event.time = date.getTime()
      event.title = 'SJPN expired'
      event.user = 'system'
      event.notes = 'SJPN expired, now waiting for court outcomes'
      req.session.cases[id].history.push(event)
      req.session.cases[id].status = 'Awaiting outcomes'
      res.redirect('/cases/referrals')
    }
  })
  // WITNESS STATEMENTS
  router.get('/case/witness-statements', function (req, res) {
    var id = req.query.id

    res.render('case/witness-statements', {
      case: req.session.cases[id],
      navTabListWitness: 'section-navigation__item--active',
      navTabLinkWitness: 'section-navigation__link--active',
      notifications: req.session.notifications
    })
  })
  router.post('/case/witness-statements', function (req, res) {
    var id = req.body.caseID
    var action = req.body.caseAction
    var referral = req.session.cases[id]
    var event = {}
    var date = new Date()

    if (action === 'issueSJPN') {
      event.date = date.getDate()
      event.time = date.getTime()
      event.title = 'SJPN issued'
      event.user = 'system'
      event.notes = 'SJPN issued to defendant and queued for delivery to court'
      req.session.cases[id].history.push(event)
      req.session.cases[id].status = 'SJPN issued'
      res.redirect('/case/overview?id=' + id)
    }
  })
  // CASE OUTCOMES
  router.get('/case/outcomes', function (req, res) {
    var id = req.query.id

    res.render('case/outcomes', {
      case: req.session.cases[id],
      navTabListOutcomes: 'section-navigation__item--active',
      navTabLinkOutcomes: 'section-navigation__link--active'
    })
  })
  // ADD OUTCOME
  router.get('/case/outcomes/add-outcome', function (req, res) {
    var caseID = req.query.caseID
    var defendantID = req.query.defendantID
    var offenceID = req.query.offenceID
    var hearingClasses = {}

    hearingClasses.day = 'govuk-input--width-2'
    hearingClasses.month = 'govuk-input--width-2'
    hearingClasses.year = 'govuk-input--width-4'

    res.render('case/outcomes/add-outcome', {
      caseID: caseID,
      defendantID: defendantID,
      offenceID: offenceID,
      case: req.session.cases[caseID],
      navTabListOutcomes: 'section-navigation__item--active',
      navTabLinkOutcomes: 'section-navigation__link--active',
      backLink: '/case/outcomes?id=' + caseID,
      hearingClasses: hearingClasses
    })
  })
  router.post('/case/outcomes/add-outcome', function (req, res) {
    var caseID = req.body.caseID
    var defendantID = req.body.defendantID
    var offenceID = req.body.offenceID
    var plea = req.body.plea
    var outcome = req.body.outcome
    var dischargeDuration = req.body.dischargeDuration
    var disqualificationDuration = req.body.disqualificationDuration
    var finalDuration = ''
    var hearingDay = req.body['hearing-day']
    var hearingMonth = req.body['hearing-month']
    var hearingYear = req.body['hearing-year']
    var fine = req.body.fine
    var costs = req.body.costs
    var errorFlag = false
    var errorList = []
    var pleaErr = {}
    var outcomeErr = {}
    var dischargeErr = {}
    var disqualErr = {}
    var hearingDayErr = {}
    var hearingMonthErr = {}
    var hearingYearErr = {}
    var hearingClasses = {}
    var pleaGuiltyChecked = false
    var pleaGuiltyCourtChecked = false
    var pleaNotGuiltyChecked = false
    var pleaNoneChecked = false
    var outcomeGuiltyChecked = false
    var outcomeGuiltyDiscChecked = false
    var outcomeGuiltyDisqChecked = false
    var outcomeNotGuiltyChecked = false
    var outcomeWithdrawnChecked = false

    hearingClasses.day = 'govuk-input--width-2'
    hearingClasses.month = 'govuk-input--width-2'
    hearingClasses.year = 'govuk-input--width-4'

    if (hearingDay === '') {
      hearingDayErr.type = 'blank'
      hearingDayErr.text = 'You must enter a hearing day'
      hearingDayErr.href = '#hearing-day'
      hearingDayErr.flag = true
      hearingClasses.day = 'govuk-input--width-2 govuk-input--error'
      errorList.push(hearingDayErr)
      errorFlag = true
    }

    if (hearingMonth === '') {
      hearingMonthErr.type = 'blank'
      hearingMonthErr.text = 'You must enter a hearing month'
      hearingMonthErr.href = '#hearing-month'
      hearingMonthErr.flag = true
      hearingClasses.month = 'govuk-input--width-2 govuk-input--error'
      errorList.push(hearingMonthErr)
      errorFlag = true
    }

    if (hearingYear === '') {
      hearingYearErr.type = 'blank'
      hearingYearErr.text = 'You must enter a hearing year'
      hearingYearErr.href = '#hearing-year'
      hearingYearErr.flag = true
      hearingClasses.year = 'govuk-input--width-4 govuk-input--error'
      errorList.push(hearingYearErr)
      errorFlag = true
    }

    if (typeof plea === 'undefined') {
      pleaErr.type = 'blank'
      pleaErr.text = 'You must enter a plea'
      pleaErr.href = '#plea-1'
      pleaErr.flag = true
      errorList.push(pleaErr)
      errorFlag = true
    }

    switch (plea) {
      case 'guilty-attend':
        pleaGuiltyCourtChecked = true
        break
      case 'guilty-not-attend':
        pleaGuiltyChecked = true
        outcome = 'guilty'
        break
      case 'not-guilty':
        pleaNotGuiltyChecked = true
        break
      case 'no-plea':
        pleaNoneChecked = true
        break
    }

    if (typeof outcome === 'undefined') {
      outcomeErr.type = 'blank'
      outcomeErr.text = 'You must enter an outcome'
      outcomeErr.href = '#outcome-1'
      outcomeErr.flag = true
      errorList.push(outcomeErr)
      errorFlag = true
    }

    switch (outcome) {
      case 'guilty':
        outcomeGuiltyChecked = true
        break
      case 'guilty-discharge':
        outcomeGuiltyDiscChecked = true
        break
      case 'guilty-disqualified':
        outcomeGuiltyDisqChecked = true
        break
      case 'not-guilty':
        outcomeNotGuiltyChecked = true
        break
      case 'withdrawn':
        outcomeWithdrawnChecked = true
        break
    }

    if (outcome === 'guilty-discharge') {
      if (dischargeDuration === '') {
        dischargeErr.type = 'blank'
        dischargeErr.text = 'You must enter a discharge duration'
        dischargeErr.href = '#discharge-duration'
        dischargeErr.flag = true
        errorList.push(dischargeErr)
        errorFlag = true
      }
    }

    if (outcome === 'guilty-disqualified') {
      if (disqualificationDuration === '') {
        disqualErr.type = 'blank'
        disqualErr.text = 'You must enter a disqualification duration'
        disqualErr.href = '#disqualification-duration'
        disqualErr.flag = true
        errorList.push(disqualErr)
        errorFlag = true
      }
    }

    if (errorFlag === true) {
      res.render('case/outcomes/add-outcome', {
        case: req.session.cases[caseID],
        navTabListOutcomes: 'section-navigation__item--active',
        navTabLinkOutcomes: 'section-navigation__link--active',
        backLink: '/case/outcomes?id=' + caseID,
        errorList: errorList,
        pleaErr: pleaErr,
        outcomeErr: outcomeErr,
        dischargeErr: dischargeErr,
        disqualErr: disqualErr,
        hearingDayErr: hearingDayErr,
        hearingMonthErr: hearingMonthErr,
        hearingYearErr: hearingYearErr,
        hearingClasses: hearingClasses,
        caseID: caseID,
        defendantID: defendantID,
        offenceID: offenceID,
        hearingDay: hearingDay,
        hearingMonth: hearingMonth,
        hearingYear: hearingYear,
        plea: plea,
        outcome: outcome,
        dischargeDuration: dischargeDuration,
        disqualificationDuration: disqualificationDuration,
        fine: fine,
        costs: costs,
        pleaGuiltyChecked: pleaGuiltyChecked,
        pleaGuiltyCourtChecked: pleaGuiltyCourtChecked,
        pleaNotGuiltyChecked: pleaNotGuiltyChecked,
        pleaNoneChecked: pleaNoneChecked,
        outcomeGuiltyChecked: outcomeGuiltyChecked,
        outcomeGuiltyDiscChecked: outcomeGuiltyDiscChecked,
        outcomeGuiltyDisqChecked: outcomeGuiltyDisqChecked,
        outcomeNotGuiltyChecked: outcomeNotGuiltyChecked,
        outcomeWithdrawnChecked: outcomeWithdrawnChecked
      })
    } else {
      if (outcome === 'guilty-discharge') {
        finalDuration = dischargeDuration
      } else if (outcome === 'guilty-disqualified') {
        finalDuration = disqualificationDuration
      }
      req.session.cases[caseID].defendants[defendantID].offences[offenceID].hearingDate.day = hearingDay
      req.session.cases[caseID].defendants[defendantID].offences[offenceID].hearingDate.month = hearingMonth
      req.session.cases[caseID].defendants[defendantID].offences[offenceID].hearingDate.year = hearingYear
      req.session.cases[caseID].defendants[defendantID].offences[offenceID].plea = plea
      req.session.cases[caseID].defendants[defendantID].offences[offenceID].outcome.type = outcome
      req.session.cases[caseID].defendants[defendantID].offences[offenceID].outcome.fine = fine
      req.session.cases[caseID].defendants[defendantID].offences[offenceID].outcome.costs = costs
      req.session.cases[caseID].defendants[defendantID].offences[offenceID].outcome.duration = finalDuration
      res.redirect('/case/outcomes?id=' + caseID)
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
      res.redirect('/cases/all')
    }
  })
  // CLOSE CASE
  router.post('/case/close-case', function (req, res) {
    var id = req.body.caseID
    var action = req.body.caseAction
    var referral = req.session.cases[id]
    var event = {}
    var date = new Date()
    var closeReason = ''
    var backLink = '/case/overview?id=' + id

    if (action === 'reason') {
      res.render('case/close-reason', {
        case: referral,
        id: id,
        action: action,
        backLink: backLink
      })
    }
    if (action === 'close') {
      closeReason = req.body.closeReason
      event.date = date.getDate()
      event.time = date.getTime()
      event.title = 'Case closed'
      event.user = 'system'
      event.notes = 'Closure reason: ' + closeReason
      req.session.cases[id].history.push(event)
      req.session.cases[id].status = 'Closed'
      req.session.cases[id].closeReason = closeReason
      res.redirect('/cases/referrals')
    }
  })
}
