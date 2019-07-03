module.exports = function (router) {
  // DEBUG CASE
  router.get('/actions/debug/case', function (req, res) {
    var id = req.query.id

    res.send(req.session.cases[id])
  })
}
