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
}
