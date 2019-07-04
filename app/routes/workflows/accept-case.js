module.exports = function (router) {
  // WORKFLOW START SCREEN

  // REVIEW CASE
  router.get('/workflows/accept-case/review-case', function (req, res) {
    var id = parseInt(req.query.id)
    var caseTab = 'section-navigation__link--active'
    var companyTab = 'section-navigation__link--active'
    var backLink = ''
    var compiledDefendants = []
    var defendantObject = {}
    var offenceObject = {}
    var i = 0
    var j = 0
    if (req.session.doNotShowAcceptCase === true) {
      backLink = '/cases/all'
    } else {
      backLink = '/workflows/accept-case/start?id=' + id
    }
    res.render('workflows/accept-case/review-case', {
      case: req.session.workingCase,
      caseOverviewTab: caseTab,
      companyOverviewTab: companyTab,
      compiledDefendants: compiledDefendants,
      backLink: backLink
    })
  })
  router.post('/workflows/accept-case/review-case', function (req, res) {
    var plea = req.body.plea
    var outcome = req.body.outcome
    var outcomeErr = {}
    var errorList = []
    var errorFlag = false
    var pleaGuiltyChecked = false
    var pleaGuiltyCourtChecked = false
    var pleaNotGuiltyChecked = false
    var pleaNoneChecked = false
    var pleaErr = {}
    var previous = res.redirect('back')

    console.log(previous)

    if (typeof plea === 'undefined') {
      pleaErr.type = 'blank'
      pleaErr.text = 'You must enter a plea'
      pleaErr.href = '#plea-1'
      pleaErr.flag = true
      errorList.push(pleaErr)
      errorFlag = true
    }

    if (errorFlag === true) {
      res.render('/workflows/accept-case/review-case', {
        pleaErr: pleaErr,
        plea: plea,
        pleaGuiltyChecked: pleaGuiltyChecked,
        pleaGuiltyCourtChecked: pleaGuiltyCourtChecked,
        pleaNotGuiltyChecked: pleaNotGuiltyChecked,
        pleaNoneChecked: pleaNoneChecked
      })
    } else {
      if (outcome === 'guilty-discharge') {
      } else if (outcome === 'guilty-disqualified') {
      }
    }
  })

  // Summary of the case
  router.get('/workflows/accept-case/summary', function (req, res) {
    var id = parseInt(req.query.id)
    var backLink = ''

    backLink = '/workflows/accept-case/review-case?id=' + id

    res.render('workflows/accept-case/summary', {
      case: req.session.workingCase,
      backLink: backLink
    })
  })
  // GENERATE ULTIMATUM
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
