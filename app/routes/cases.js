var arraySort = require('array-sort')

module.exports = function (router) {
  // ALL CASES
  router.get('/cases/all', function (req, res) {
    var sortedCases = []
    var filteredCases = []
    var mimicArray = []
    var pagination = {}
    var filterParams = {}
    var viewParams = {}
    var pageObject = {}
    var i = 0
    var j = 0
    var k = 1
    var startPoint = 0
    var stopPoint = 0
    var totalPages = 0

    viewParams.sort = {}
    viewParams.perPage = {}
    req.session.perPage = {}
    viewParams.page = {}
    req.session.page = {}
    viewParams.sort.sorter = 'company.name'
    viewParams.sort.reverse = false
    viewParams.sort.urlString = ''
    viewParams.total = []

    // MANAGE VIEW
    viewParams.sort.companyName = {}
    viewParams.sort.companyName.label = 'Company name'
    viewParams.sort.companyName.urlString = 'sortParam=companyName'
    viewParams.sort.companyNumber = {}
    viewParams.sort.companyNumber.label = 'Company number'
    viewParams.sort.companyNumber.urlString = 'sortParam=companyNumber'
    viewParams.sort.status = {}
    viewParams.sort.status.label = 'Status'
    viewParams.sort.status.urlString = 'sortParam=status'
    viewParams.sort.priority = {}
    viewParams.sort.priority.label = 'Priority'
    viewParams.sort.priority.urlString = 'sortParam=priority'
    viewParams.sort.reference = {}
    viewParams.sort.reference.label = 'Reference'
    viewParams.sort.reference.urlString = 'sortParam=reference'
    viewParams.sort.referred = {}
    viewParams.sort.referred.label = 'Referral date'
    viewParams.sort.referred.urlString = 'sortParam=referred'

    if (req.query.sortParam) {
      req.session.sortParam = req.query.sortParam
    }
    if (req.query.resultsPerPage) {
      req.session.resultsPerPage = req.query.resultsPerPage
    }
    if (req.query.page) {
      req.session.page.value = req.query.page
    }

    if (req.session.sortParam) {
      viewParams.sort.active = req.session.sortParam
      // / COMPANY NUMBER
      if (req.session.sortParam === 'companyName') {
        viewParams.sort.companyName.label = 'Company name (A-Z)'
        viewParams.sort.companyName.urlString = 'sortParam=companyNameReverse'
        viewParams.sort.urlString = 'sortParam=companyName'
        viewParams.total.push('sortParam=companyNameReverse')
        viewParams.sort.sorter = 'company.name'
        viewParams.sort.reverse = false
      } else if (req.session.sortParam === 'companyNameReverse') {
        viewParams.sort.companyName.label = 'Company name (Z-A)'
        viewParams.sort.companyName.urlString = 'sortParam=companyName'
        viewParams.sort.urlString = 'sortParam=companyNameReverse'
        viewParams.total.push('sortParam=companyName')
        viewParams.sort.sorter = 'company.name'
        viewParams.sort.reverse = true
      }
      // / COMPANY NUMBER
      if (req.session.sortParam === 'companyNumber') {
        viewParams.sort.companyNumber.label = 'Company number (A-Z)'
        viewParams.sort.companyNumber.urlString = 'sortParam=companyNumberReverse'
        viewParams.sort.urlString = 'sortParam=companyNumber'
        viewParams.total.push('sortParam=companyNumberReverse')
        viewParams.sort.sorter = 'company.number'
        viewParams.sort.reverse = false
      } else if (req.session.sortParam === 'companyNumberReverse') {
        viewParams.sort.companyNumber.label = 'Company number (Z-A)'
        viewParams.sort.companyNumber.urlString = 'sortParam=companyNumber'
        viewParams.sort.urlString = 'sortParam=companyNumberReverse'
        viewParams.total.push('sortParam=companyNumber')
        viewParams.sort.sorter = 'company.number'
        viewParams.sort.reverse = true
      }
      // / STATUS
      if (req.session.sortParam === 'status') {
        viewParams.sort.status.label = 'Status (A-Z)'
        viewParams.sort.status.urlString = 'sortParam=statusReverse'
        viewParams.sort.urlString = 'sortParam=status'
        viewParams.total.push('sortParam=statusReverse')
        viewParams.sort.sorter = 'status'
        viewParams.sort.reverse = false
      } else if (req.session.sortParam === 'statusReverse') {
        viewParams.sort.status.label = 'status (Z-A)'
        viewParams.sort.status.urlString = 'sortParam=status'
        viewParams.sort.urlString = 'sortParam=statusReverse'
        viewParams.total.push('sortParam=status')
        viewParams.sort.sorter = 'status'
        viewParams.sort.reverse = true
      }
      // / PRIORITY
      if (req.session.sortParam === 'priority') {
        viewParams.sort.priority.label = 'Priority (A-Z)'
        viewParams.sort.priority.urlString = 'sortParam=priorityReverse'
        viewParams.sort.urlString = 'sortParam=priority'
        viewParams.total.push('sortParam=priorityReverse')
        viewParams.sort.sorter = 'priority'
        viewParams.sort.reverse = false
      } else if (req.session.sortParam === 'priorityReverse') {
        viewParams.sort.priority.label = 'priority (Z-A)'
        viewParams.sort.priority.urlString = 'sortParam=priority'
        viewParams.sort.urlString = 'sortParam=priorityReverse'
        viewParams.total.push('sortParam=priority')
        viewParams.sort.sorter = 'priority'
        viewParams.sort.reverse = true
      }
      // / REFERENCE
      if (req.session.sortParam === 'reference') {
        viewParams.sort.reference.label = 'Reference (A-Z)'
        viewParams.sort.reference.urlString = 'sortParam=referenceReverse'
        viewParams.sort.urlString = 'sortParam=reference'
        viewParams.total.push('sortParam=referenceReverse')
        viewParams.sort.sorter = 'reference'
        viewParams.sort.reverse = false
      } else if (req.session.sortParam === 'referenceReverse') {
        viewParams.sort.reference.label = 'reference (Z-A)'
        viewParams.sort.reference.urlString = 'sortParam=reference'
        viewParams.sort.urlString = 'sortParam=referenceReverse'
        viewParams.total.push('sortParam=reference')
        viewParams.sort.sorter = 'reference'
        viewParams.sort.reverse = true
      }
      // / CREATED DATE
      if (req.session.sortParam === 'referred') {
        viewParams.sort.referred.label = 'Referral date (A-Z)'
        viewParams.sort.referred.urlString = 'sortParam=referredReverse'
        viewParams.sort.urlString = 'sortParam=referred'
        viewParams.total.push('sortParam=referredReverse')
        viewParams.sort.sorter = 'referred'
        viewParams.sort.reverse = false
      } else if (req.session.sortParam === 'referredReverse') {
        viewParams.sort.referred.label = 'Referreal date (Z-A)'
        viewParams.sort.referred.urlString = 'sortParam=referred'
        viewParams.sort.urlString = 'sortParam=referredReverse'
        viewParams.total.push('sortParam=referred')
        viewParams.sort.sorter = 'referred'
        viewParams.sort.reverse = true
      }
    }

    sortedCases = req.session.cases.slice(0)
    arraySort(sortedCases, viewParams.sort.sorter, {reverse: viewParams.sort.reverse})

    console.log(req.session.filterParams)
    if (typeof req.session.filterParams !== 'undefined') {
      filterParams = req.session.filterParams
      // COMPANY NUMBER FILTER
      if (req.session.filterParams.companyNumber !== '') {
        for (i = 0; i < sortedCases.length; i++) {
          if (sortedCases[i].company.number.indexOf(req.session.filterParams.companyNumber) !== -1) {
            mimicArray.push(sortedCases[i])
            console.log(req.session.filterParams.companyNumber + ': ' + sortedCases[i].company.number)
          }
        }
        sortedCases = mimicArray.splice(0)
        mimicArray = []
      }
      // CASE REFERENCE FILTER
      if (req.session.filterParams.caseReference !== '') {
        for (i = 0; i < sortedCases.length; i++) {
          if (sortedCases[i].reference.indexOf(req.session.filterParams.caseReference) !== -1) {
            mimicArray.push(sortedCases[i])
            console.log(req.session.filterParams.caseReference + ': ' + sortedCases[i].reference)
          }
        }
        sortedCases = mimicArray.splice(0)
        mimicArray = []
      }
      // STATUS FILTER
      if (req.session.filterParams.status.all !== '_unchecked') {
        for (i = 0; i < sortedCases.length; i++) {
          for (j = 0; j < req.session.filterParams.status.all.length; j++) {
            if (sortedCases[i].status === req.session.filterParams.status.all[j]) {
              mimicArray.push(sortedCases[i])
            }
          }
        }
        sortedCases = mimicArray.splice(0)
        mimicArray = []
      }
      filteredCases = sortedCases.splice(0)
    } else {
      filteredCases = sortedCases.splice(0)
    }

    // PER PAGE
    if (req.session.resultsPerPage) {
      viewParams.perPage.value = parseInt(req.session.resultsPerPage)
      req.session.perPage.value = parseInt(req.session.resultsPerPage)
    } else {
      viewParams.perPage.value = 10
      req.session.perPage.value = 10
    }

    // PAGE NUMBER
    if (req.query.page) {
      viewParams.page.value = parseInt(req.session.page.value)
      req.session.page.value = parseInt(req.session.page.value)
    } else {
      viewParams.page.value = 1
      req.session.page.value = 1
    }

    // START POINT
    // If not page 1(0), perPage multiplied by page number - 1 for array index
    if (viewParams.page.value === 1) {
      startPoint = 0
    } else {
      startPoint = (viewParams.perPage.value * (viewParams.page.value - 1))
      console.log(startPoint)
    }
    // END POINT
    // start point + perPage or filteredCases.length
    stopPoint = startPoint + viewParams.perPage.value
    if (stopPoint > filteredCases.length) {
      stopPoint = filteredCases.length
    }

    // TOTAL PAGES
    // console.log('Total pages: ' + Math.ceil(filteredCases.length / viewParams.perPage.value))
    totalPages = Math.ceil(filteredCases.length / viewParams.perPage.value)

    // PAGINATION
    pagination.currentPage = viewParams.page.value
    if (viewParams.page.value > 1) {
      pagination.previousPage = viewParams.page.value - 1
    }
    if (viewParams.page.value < totalPages) {
      pagination.nextPage = viewParams.page.value + 1
    }
    pagination.totalPages = totalPages
    pagination.pages = []
    if (totalPages > 1) {
      while (k <= totalPages) {
        pageObject = {}
        pageObject.number = k
        pagination.pages.push(pageObject)
        k++
      }
    }
    console.log(pagination)
    mimicArray = []
    while (startPoint < stopPoint) {
      console.log(startPoint + ': ' + filteredCases[startPoint].company.name)
      mimicArray.push(filteredCases[startPoint])
      startPoint++
    }

    filteredCases = mimicArray.splice(0)
    // console.log(filteredCases.splice(((viewParams.perPage.value * viewParams.page.value) - 1), viewParams.perPage.value))

    res.render('cases/all', {
      cases: filteredCases,
      allLinkActive: 'section-navigation__link--active',
      viewParams: viewParams,
      filterParams: filterParams,
      pagination: pagination
    })
  })
  router.post('/cases/all', function (req, res) {
    var filterParams = {}
    var viewParams = {}
    var pagination = {}
    var pageObject = {}
    var filterStatus = req.body.filterStatus
    var filterCompanyNumber = req.body.filterCompanyNumber
    var filterCaseReference = req.body.filterCaseReference
    var sortedCases = []
    var filteredCases = []
    var mimicArray = []
    var i = 0
    var j = 0
    var k = 1
    var startPoint = 0
    var stopPoint = 0
    var totalPages = 0

    viewParams.sort = {}
    viewParams.perPage = {}
    req.session.perPage = {}
    viewParams.page = {}
    req.session.page = {}
    viewParams.sort.sorter = 'company.name'
    viewParams.sort.reverse = false
    viewParams.sort.urlString = ''
    viewParams.total = []

    // MANAGE VIEW
    viewParams.sort.companyName = {}
    viewParams.sort.companyName.label = 'Company name'
    viewParams.sort.companyName.urlString = 'sortParam=companyName'
    viewParams.sort.companyNumber = {}
    viewParams.sort.companyNumber.label = 'Company number'
    viewParams.sort.companyNumber.urlString = 'sortParam=companyNumber'
    viewParams.sort.status = {}
    viewParams.sort.status.label = 'Status'
    viewParams.sort.status.urlString = 'sortParam=status'
    viewParams.sort.priority = {}
    viewParams.sort.priority.label = 'Priority'
    viewParams.sort.priority.urlString = 'sortParam=priority'
    viewParams.sort.reference = {}
    viewParams.sort.reference.label = 'Reference'
    viewParams.sort.reference.urlString = 'sortParam=reference'
    viewParams.sort.referred = {}
    viewParams.sort.referred.label = 'Referral date'
    viewParams.sort.referred.urlString = 'sortParam=referred'

    if (req.query.sortParam) {
      req.session.sortParam = req.query.sortParam
    }
    if (req.query.resultsPerPage) {
      req.session.resultsPerPage = req.query.resultsPerPage
    }
    if (req.query.page) {
      req.session.page.value = req.query.page
    }

    if (req.session.sortParam) {
      viewParams.sort.active = req.session.sortParam
      // / COMPANY NUMBER
      if (req.session.sortParam === 'companyName') {
        viewParams.sort.companyName.label = 'Company name (A-Z)'
        viewParams.sort.companyName.urlString = 'sortParam=companyNameReverse'
        viewParams.sort.urlString = 'sortParam=companyName'
        viewParams.sort.sorter = 'company.name'
        viewParams.sort.reverse = false
      } else if (req.session.sortParam === 'companyNameReverse') {
        viewParams.sort.companyName.label = 'Company name (Z-A)'
        viewParams.sort.companyName.urlString = 'sortParam=companyName'
        viewParams.sort.urlString = 'sortParam=companyNameReverse'
        viewParams.sort.sorter = 'company.name'
        viewParams.sort.reverse = true
      }
      // / COMPANY NUMBER
      if (req.session.sortParam === 'companyNumber') {
        viewParams.sort.companyNumber.label = 'Company number (A-Z)'
        viewParams.sort.companyNumber.urlString = 'sortParam=companyNumberReverse'
        viewParams.sort.urlString = 'sortParam=companyNumber'
        viewParams.sort.sorter = 'company.number'
        viewParams.sort.reverse = false
      } else if (req.session.sortParam === 'companyNumberReverse') {
        viewParams.sort.companyNumber.label = 'Company number (Z-A)'
        viewParams.sort.companyNumber.urlString = 'sortParam=companyNumber'
        viewParams.sort.urlString = 'sortParam=companyNumberReverse'
        viewParams.sort.sorter = 'company.number'
        viewParams.sort.reverse = true
      }
      // / STATUS
      if (req.session.sortParam === 'status') {
        viewParams.sort.status.label = 'Status (A-Z)'
        viewParams.sort.status.urlString = 'sortParam=statusReverse'
        viewParams.sort.urlString = 'sortParam=status'
        viewParams.sort.sorter = 'status'
        viewParams.sort.reverse = false
      } else if (req.session.sortParam === 'statusReverse') {
        viewParams.sort.status.label = 'status (Z-A)'
        viewParams.sort.status.urlString = 'sortParam=status'
        viewParams.sort.urlString = 'sortParam=statusReverse'
        viewParams.sort.sorter = 'status'
        viewParams.sort.reverse = true
      }
      // / PRIORITY
      if (req.session.sortParam === 'priority') {
        viewParams.sort.priority.label = 'Priority (A-Z)'
        viewParams.sort.priority.urlString = 'sortParam=priorityReverse'
        viewParams.sort.urlString = 'sortParam=priority'
        viewParams.sort.sorter = 'priority'
        viewParams.sort.reverse = false
      } else if (req.session.sortParam === 'priorityReverse') {
        viewParams.sort.priority.label = 'priority (Z-A)'
        viewParams.sort.priority.urlString = 'sortParam=priority'
        viewParams.sort.urlString = 'sortParam=priorityReverse'
        viewParams.sort.sorter = 'priority'
        viewParams.sort.reverse = true
      }
      // / REFERENCE
      if (req.session.sortParam === 'reference') {
        viewParams.sort.reference.label = 'Reference (A-Z)'
        viewParams.sort.reference.urlString = 'sortParam=referenceReverse'
        viewParams.sort.urlString = 'sortParam=reference'
        viewParams.sort.sorter = 'reference'
        viewParams.sort.reverse = false
      } else if (req.session.sortParam === 'referenceReverse') {
        viewParams.sort.reference.label = 'reference (Z-A)'
        viewParams.sort.reference.urlString = 'sortParam=reference'
        viewParams.sort.urlString = 'sortParam=referenceReverse'
        viewParams.sort.sorter = 'reference'
        viewParams.sort.reverse = true
      }
      // / CREATED DATE
      if (req.session.sortParam === 'referred') {
        viewParams.sort.referred.label = 'Referral date (A-Z)'
        viewParams.sort.referred.urlString = 'sortParam=referredReverse'
        viewParams.sort.urlString = 'sortParam=referred'
        viewParams.sort.sorter = 'referred'
        viewParams.sort.reverse = false
      } else if (req.session.sortParam === 'referredReverse') {
        viewParams.sort.referred.label = 'Referreal date (Z-A)'
        viewParams.sort.referred.urlString = 'sortParam=referred'
        viewParams.sort.urlString = 'sortParam=referredReverse'
        viewParams.sort.sorter = 'referred'
        viewParams.sort.reverse = true
      }
    }

    sortedCases = req.session.cases.slice(0)
    sortedCases = arraySort(req.session.cases, viewParams.sort.sorter, {reverse: viewParams.sort.reverse})

    // COMPANY NUMBER FILTER
    filterParams.companyNumber = filterCompanyNumber
    if (filterCompanyNumber !== '') {
      for (i = 0; i < sortedCases.length; i++) {
        if (sortedCases[i].company.number.indexOf(filterCompanyNumber) !== -1) {
          mimicArray.push(sortedCases[i])
          console.log(filterCompanyNumber + ': ' + sortedCases[i].company.number)
        }
      }
      sortedCases = mimicArray.splice(0)
      mimicArray = []
    }

    // CASE REFERENCE FILTER
    filterParams.caseReference = filterCaseReference
    if (filterCaseReference !== '') {
      for (i = 0; i < sortedCases.length; i++) {
        if (sortedCases[i].reference.indexOf(filterCaseReference) !== -1) {
          mimicArray.push(sortedCases[i])
          console.log(filterCaseReference + ': ' + sortedCases[i].reference)
        }
      }
      sortedCases = mimicArray.splice(0)
      mimicArray = []
    }

    filterParams.status = {}
    filterParams.status.all = filterStatus
    if (filterStatus !== '_unchecked') {
      for (i = 0; i < filterStatus.length; i++) {
        switch (filterStatus[i]) {
          case 'Referred':
            filterParams.status.referred = {}
            filterParams.status.referred.checked = true
            break
          case 'Accepted':
            filterParams.status.accepted = {}
            filterParams.status.accepted.checked = true
            break
          case 'Ultimatum issued':
            filterParams.status.ultimatumIssued = {}
            filterParams.status.ultimatumIssued.checked = true
            break
          case 'Ultimatum expired':
            filterParams.status.ultimatumExpired = {}
            filterParams.status.ultimatumExpired.checked = true
            break
          case 'SJPN issued':
            filterParams.status.sjpnIssued = {}
            filterParams.status.sjpnIssued.checked = true
            break
          case 'Awaiting outcomes':
            filterParams.status.awaitingOutcomes = {}
            filterParams.status.awaitingOutcomes.checked = true
            break
          case 'Adjourned':
            filterParams.status.adjourned = {}
            filterParams.status.adjourned.checked = true
            break
          case 'Closed':
            filterParams.status.closed = {}
            filterParams.status.closed.checked = true
            break
        }
      }
      mimicArray = []
      for (i = 0; i < sortedCases.length; i++) {
        for (j = 0; j < filterStatus.length; j++) {
          if (sortedCases[i].status === filterStatus[j]) {
            mimicArray.push(sortedCases[i])
            console.log(sortedCases[i].company.name)
          }
        }
      }
      sortedCases = mimicArray.splice(0)
      mimicArray = []
    }
    filteredCases = sortedCases.splice(0)

    console.log(filterParams)
    req.session.filterParams = filterParams

    // PER PAGE
    if (req.session.resultsPerPage) {
      viewParams.perPage.value = parseInt(req.session.resultsPerPage)
      req.session.perPage.value = parseInt(req.session.resultsPerPage)
    } else {
      viewParams.perPage.value = 10
      req.session.perPage.value = 10
    }

    // PAGE NUMBER
    if (req.session.page.value) {
      viewParams.page.value = parseInt(req.session.page.value)
      req.session.page.value = parseInt(req.session.page.value)
    } else {
      viewParams.page.value = 1
      req.session.page.value = 1
    }

    // START POINT
    if (viewParams.page.value === 1) {
      startPoint = 0
    } else {
      startPoint = (viewParams.perPage.value * (viewParams.page.value - 1))
      console.log(startPoint)
    }
    // END POINT
    stopPoint = startPoint + viewParams.perPage.value
    if (stopPoint > filteredCases.length) {
      stopPoint = filteredCases.length
    }

    // TOTAL PAGES
    totalPages = Math.ceil(filteredCases.length / viewParams.perPage.value)

    // PAGINATION
    pagination.currentPage = viewParams.page.value
    if (viewParams.page.value > 1) {
      pagination.previousPage = viewParams.page.value - 1
    }
    if (viewParams.page.value < totalPages) {
      pagination.nextPage = viewParams.page.value + 1
    }
    pagination.totalPages = totalPages
    pagination.pages = []
    if (totalPages > 1) {
      while (k <= totalPages) {
        pageObject = {}
        pageObject.number = k
        pagination.pages.push(pageObject)
        k++
      }
    }
    console.log(pagination)
    mimicArray = []
    while (startPoint < stopPoint) {
      console.log(startPoint + ': ' + filteredCases[startPoint].company.name)
      mimicArray.push(filteredCases[startPoint])
      startPoint++
    }

    filteredCases = mimicArray.splice(0)
    mimicArray = []

    res.render('cases/all', {
      cases: filteredCases,
      allLinkActive: 'section-navigation__link--active',
      viewParams: viewParams,
      filterParams: filterParams,
      pagination: pagination
    })
  })

  // Referrals screen
  router.get('/cases/referrals', function (req, res) {
    var totalReferredCases = 0
    var i = 0

    for (i = 0; i < req.session.cases.length; i++) {
      if (req.session.cases[i].status === 'company.name') {
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

  // Closed screen
  router.get('/cases/closed', function (req, res) {
    var totalClosedCases = 0
    var i = 0

    for (i = 0; i < req.session.cases.length; i++) {
      if (req.session.cases[i].status === 'Closed') {
        totalClosedCases++
      }
    }
    res.render('cases/closed', {
      cases: req.session.cases,
      totalClosedCases: totalClosedCases,
      closedLinkActive: 'section-navigation__link--active'
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
