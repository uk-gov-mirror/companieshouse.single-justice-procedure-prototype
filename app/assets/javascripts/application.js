/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

// Generate ultimatum
var generateUltimatum = function (id) {
  $('.govuk-panel--doc-gen').slideUp(400, function () {
    $('.action-bar__button--ultimatum').removeClass('govuk-button--disabled')
    $('.action-bar__button--ultimatum').attr('aria-disabled', false)
    $('.action-bar__button--ultimatum').attr('disabled', false)
    $.get('/actions/ultimatum/generate', { id: id }).done(function (data) {
      $('.document-container').show()
    })
  })
}

// Generate ultimatum (Async)
var generateUltimatumLabel = function (id) {
  $('.ultimatum-generator').html('Generated - 13 June 2019')
  $('.ultimatum-view-link').show()
}

// Generate SJPN
var generateSJPN = function (id) {
  $('.govuk-panel--doc-gen').slideUp(400, function () {
    $('.action-bar__button--sjpn').removeClass('govuk-button--disabled')
    $('.action-bar__button--sjpn').attr('aria-disabled', false)
    $('.action-bar__button--sjpn').attr('disabled', false)
    $.get('/actions/sjpn/generate', { id: id }).done(function (data) {
      $('.document-container').show()
    })
  })
}

$(document).ready(function () {
  window.GOVUKFrontend.initAll()

  // CASE DEBUG
  $('#debug-case').submit(function () {
    var caseID = $('#case-debug-id').val()
    $.get('/actions/debug/case', { id: caseID }).done(function (data) {
      console.log(data)
    })
    return false
  })

  $('.result-count').text('Showing 3 of 10 cases on 5 pages')
  $('.result-count').attr('data-current', 3)
  $('.result-count').attr('data-total', 10)
  $('.result-count').attr('data-pages', 5)

  $(".filter input[type='checkbox']").change(function () {
    var current = parseInt($('.result-count').attr('data-current'))
    var total = parseInt($('.result-count').attr('data-total'))
    var pages = parseInt($('.result-count').attr('data-pages'))
    $('.result-count').attr('data-current', current + 1)
    $('.result-count').attr('data-total', total + 1)
    $('.result-count').text('Showing ' + (current + 1) + ' of ' + (total + 1) + ' cases on ' + pages + ' pages')
  })

  $('.filters-heading').click(function () {
    if ($(this).parent().hasClass('open')) {
      $(this).parent().removeClass('open')
      $(this).attr('aria-expanded', false)
      $(this).next().attr('aria-hidden', true)
    } else {
      $(this).parent().addClass('open')
      $(this).attr('aria-expanded', true)
      $(this).next().attr('aria-hidden', false)
    }
    return false
  })

  // Filter Reset
  $('.filter-reset').click(function () {
    $('.filters :checkbox:enabled').prop('checked', false)
    return false
  })

  $('.filter-expand').click(function () {
    $('.filter').addClass('open')
    return false
  })

  // SHOW FILING TYPE
  $("input[name='filterType']").change(function () {
    $('.filing-type').toggle()
  })

  // BOOKMARKS
  $('.bookmark-button').click(function () {
    var button = $(this)
    $.get('/actions/bookmarks/toggle', { id: $(this).data('value') }).done(function (data) {
      if (data === true) {
        button.children().addClass('fa-star--active')
      } else {
        button.children().removeClass('fa-star--active')
      }
    })
    return false
  })

  // SHOW FILING TYPE
  $('.section-navigation__item--disabled').click(function () {
    return false
  })

  // SECTION SWITCHER
  $('.section-toggle').click(function () {
    var target = $(this).data('target')
    var section = $(this).data('section')
    if ($(this).hasClass('section-navigation__link--active')) {
      // DO NOTHING...
    } else {
      $('.' + section + ' .section-navigation__link').removeClass('section-navigation__link--active')
      $('.' + section + ' .section-navigation__item').removeClass('section-navigation__item--active')
      $(this).parent().addClass('section-navigation__item--active')
      $(this).addClass('section-navigation__link--active')
      $('.' + section + ' .toggle-pane').removeClass('toggle-pane--active')
      $('.' + section + ' .toggle-pane').attr('aria-expanded', false)
      $('.' + section + ' .toggle-pane').attr('aria-hidden', true)
      $('#' + target).addClass('toggle-pane--active')
      $('#' + target).attr('aria-expanded', true)
      $('#' + target).attr('aria-hidden', false)
    }
    return false
  })

  // ACCEPT CASE
  $('.case-accept-button').click(function () {
    // $('#case-details-form').submit()
    // return false
  })

  // CHANGE DEFENDANT ADDRESS
  $('.defendant-address-button').click(function () {
    $('#defendant-address-form').submit()
    return false
  })

  // REGENERATE ULTIMATUM
  $('.recreate-ultimatum').click(function () {
    var id = $(this).data('id')

    $('.document-container').hide()
    $('.govuk-panel--doc-gen').slideDown(400, function () {
      window.setTimeout(function () {
        generateUltimatum(id)
      }, 5000)
    })
    return false
  })

  // REGENERATE SJPN
  $('.recreate-sjpn').click(function () {
    var id = $(this).data('id')

    $('.document-container').hide()
    $('.govuk-panel--doc-gen').slideDown(400, function () {
      window.setTimeout(function () {
        generateSJPN(id)
      }, 5000)
    })
    return false
  })

  // FILTER CASES
  $('.filter .govuk-checkboxes__input').click(function () {
    // $('#filter-form').submit()
    // return false
  })

  // RESULTS PER PAGE
  $('.table-per-page__input').change(function () {
    $('#resultsPerPage').submit()
    return false
  })

  // ADD OUTCOME
  $('input[name=\'plea\']').change(function () {
    if ($(this).val() === 'guilty-not-attend') {
      $('#outcome-1').click()
      $('input[name=\'outcome\']').attr('disabled', '')
    } else {
      $('input[name=\'outcome\']').attr('disabled', false)
      $('input[name=\'outcome\']').attr('checked', false)
    }
  })
})

var form = $('form[name="caseDecision"]'),
  radio = $('input[name="caseOption"]'),
  choice = ''

radio.change(function (e) {
  choice = this.value

  if (choice === 'yes') {
    form.attr('action', '/workflows/accept-case/review-case?id=0')
  } if (choice === 'no') {
    form.attr('action', '/cases/all?id=0&case=rejected')
  }
})

// Hide notification on the overview screen
function dismiss () {
  document.getElementById('notification').parentNode.style.display = 'none'
};

// Parse the URL parameter
function getParameterByName (name, url) {
  if (!url) url = window.location.href
  name = name.replace(/[\[\]]/g, '\\$&')
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
	        results = regex.exec(url)
	    if (!results) return null
	    if (!results[2]) return ''
	    return decodeURIComponent(results[2].replace(/\+/g, ' '))
}
// Give the parameter a variable name
var dynamicContent = getParameterByName('caseOption')
var withdrawCase = getParameterByName('withdrawCase')

$(document).ready(function () {
  // Check if the URL parameter is apples
  if (dynamicContent == 'no') {
    $('.govuk-notification').show()
  }
  if (withdrawCase == 'no') {
    $('.govuk-notification').show()
  }

  $('.comment-closed').click(function () {
    $('.comment-textbox').slideToggle()
    $(this).text($(this).text() == 'Add comment' ? 'Cancel Comment' : 'Add comment')
  })
  $('.ultimatum-view-link').click(function () {
    var time = new Date()
    $(this).parent('.person-btn-container').parent('.govuk-table__row').children('.person-date').html(time.toDateString())
  })
})

var tog = $('.offenses-warning').hide()
$('.govuk-checkboxes__input').change(function () {
  $(tog).toggle($('.govuk-checkboxes__input:not(:checked)').length > 1)
}).change()
