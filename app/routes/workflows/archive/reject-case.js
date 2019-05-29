module.exports = function (router) {
  router.get('/workflows/accept-case/start', function (req, res) {
    var id = req.query.id

    res.render('workflows/accept-case/start', {
      case: req.session.cases[id],
      navTabListUltimatum: 'section-navigation__item--active',
      navTabLinkUltimatum: 'section-navigation__link--active',
      backLink: '/cases/referrals'
    })
  })
}
