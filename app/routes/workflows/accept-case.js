module.exports = function (router) {
  // WORKFLOW START SCREEN
  router.get('/workflows/accept-case/start', function (req, res) {
    var id = parseInt(req.query.id)
    var i = 0

    if (req.session.doNotShowAcceptCase === true) {
      res.redirect('/workflows/accept-case/review-case?id=' + id)
    } else {
      for (i = 0; i < req.session.cases.length; i++) {
        console.log(req.session.cases[i].company.name)
        if (req.session.cases[i].id === id) {
          req.session.workingCase = req.session.cases[i]
        }
      }

      res.render('workflows/accept-case/start', {
        case: req.session.workingCase,
        backLink: '/cases/all'
      })
    }
  })
  router.post('/workflows/accept-case/start', function (req, res) {
    var caseID = req.body.caseID
    var doNotShow = req.body.doNotShow

    if (doNotShow !== '_unchecked') {
      req.session.doNotShowAcceptCase = true
    }
    res.redirect('/workflows/accept-case/review-case?id=' + caseID)
  })

  // STEP 1: REVIEW CASE
  router.get('/workflows/accept-case/review-case', function (req, res) {
    var id = parseInt(req.query.id)
    var caseTab = 'section-navigation__link--active'
    var companyTab = 'section-navigation__link--active'
    var backLink = ''

    if (req.session.doNotShowAcceptCase === true) {
      backLink = '/cases/all'
    } else {
      backLink = '/workflows/accept-case/start?id=' + id
    }

    res.render('workflows/accept-case/review-case', {
      case: req.session.workingCase,
      caseOverviewTab: caseTab,
      companyOverviewTab: companyTab,
      backLink: backLink
    })
  })

  // STEP 2: SELECT OFFENCES
  router.get('/workflows/accept-case/select-offences', function (req, res) {
    var id = parseInt(req.query.id)
    var backLink = ''
    var compiledDefendants = []
    var defendantObject = {}
    var offenceObject = {}
    var i = 0
    var j = 0

    backLink = '/workflows/accept-case/review-case?id=' + id

    for (i = 0; i < req.session.workingCase.defendants.length; i++) {
      defendantObject.name = req.session.workingCase.defendants[i].name
      defendantObject.offences = []
      for (j = 0; j < req.session.workingCase.defendants[i].offences.length; j++) {
        offenceObject.value = i + '-' + j
        if (req.session.workingCase.defendants[i].offences[j].type === 'AA') {
          offenceObject.text = 'Annual accounts'
        } else if (req.session.workingCase.defendants[i].offences[j].type === 'CS') {
          offenceObject.text = 'Confirmation statement'
        } else {
          offenceObject.text = req.session.workingCase.defendants[i].offences[j].type
        }
        offenceObject.checked = false
        defendantObject.offences.push(offenceObject)
      }
      compiledDefendants.push(defendantObject)
    }
    console.log(compiledDefendants)
    console.log(compiledDefendants[0].offences)

    res.render('workflows/accept-case/select-offences', {
      case: req.session.workingCase,
      compiledDefendants: compiledDefendants,
      backLink: backLink
    })
  })

  // STEP 3: GENERATE ULTIMATUM
  router.get('/workflows/accept-case/create-ultimatum', function (req, res) {
    var id = parseInt(req.query.id)
    var backLink = ''

    backLink = '/workflows/accept-case/select-offences?id=' + id

    res.render('workflows/accept-case/create-ultimatum', {
      case: req.session.workingCase,
      backLink: backLink
    })
  })

  // STEP 4: ACCEPT CASE
  router.get('/workflows/accept-case/accept-case', function (req, res) {
    var id = parseInt(req.query.id)
    var backLink = ''

    backLink = '/workflows/accept-case/create-ultimatum?id=' + id

    res.render('workflows/accept-case/accept-case', {
      case: req.session.workingCase,
      backLink: backLink
    })
  })
  router.post('/workflows/accept-case/accept-case', function (req, res) {
    var id = parseInt(req.body.id)
    var event = {}
    var date = new Date()

    event.date = date.getDate()
    event.time = date.getTime()
    event.title = 'Case accepted'
    event.user = 'User'
    event.notes = 'Case accepted by user.'
    req.session.cases[id].history.push(event)
    req.session.cases[id].status = 'Ultimatum issued'
    req.session.cases[id].defendants[0].offences[0].status = 'proceed'

    res.redirect('/case/overview?id=' + id)
  })
}
