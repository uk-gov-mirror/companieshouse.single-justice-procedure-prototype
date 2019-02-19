module.exports = function (router) {
  // BOOKMARK CASE
  router.get('/actions/bookmarks/toggle', function (req, res) {
    var id = req.query.id

    if (req.session.cases[id].bookmarked === true) {
      req.session.cases[id].bookmarked = false
    } else {
      req.session.cases[id].bookmarked = true
    }
    console.log(req.session.cases[id].bookmarked)
    res.send(req.session.cases[id].bookmarked)
  })

  // GENERATE ULTIMATUM
  router.get('/actions/ultimatum/generate', function (req, res) {
    var id = req.query.id

    req.session.cases[id].ultimatumGenerated = true
    res.send(req.session.cases[id].ultimatumGenerated)
  })

  // GENERATE SJPN
  router.get('/actions/sjpn/generate', function (req, res) {
    var id = req.query.id

    req.session.cases[id].sjpnGenerated = true
    res.send(req.session.cases[id].sjpnGenerated)
  })
}
