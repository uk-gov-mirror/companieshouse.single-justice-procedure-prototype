/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

$(document).ready(function () {
  $('.result-count').text('Showing 3 of 10 cases on 5 pages')
  $('.result-count').attr('data-current', 3)
  $('.result-count').attr('data-total', 10)
  $('.result-count').attr('data-pages', 5)

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

  $(".filter input[type='checkbox']").change(function () {
    var current = parseInt($('.result-count').attr('data-current'))
    var total = parseInt($('.result-count').attr('data-total'))
    var pages = parseInt($('.result-count').attr('data-pages'))
    $('.result-count').attr('data-current', current + 1)
    $('.result-count').attr('data-total', total + 1)
    $('.result-count').text('Showing ' + (current + 1) + ' of ' + (total + 1) + ' cases on ' + pages + ' pages')
  })

  // SHOW FILING TYPE
  $("input[name='filterType']").change(function () {
    $('.filing-type').toggle()
  })

  // BOOKMARKS
  $('.bookmark-button').click(function () {
    var button = $(this)
    $.get('/actions/bookmarks/toggle', { id: $(this).data('value') }).done(function (data) {
      console.log(data)
      if (data === true) {
        button.children().addClass('fa-star--active')
      } else {
        button.children().removeClass('fa-star--active')
      }
    })
    return false
  })
})
