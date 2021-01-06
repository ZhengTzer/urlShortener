$('.btn-success').tooltip({
  trigger: 'click',
  placement: 'right'
})

function setTooltip(btn, message) {
  btn.tooltip('hide').attr('data-original-title', message).tooltip('show')
}

function hideTooltip(btn) {
  setTimeout(function () {
    btn.tooltip('hide')
  }, 1000)
}

// Clipboard
const clipboard = new Clipboard('.btn-success')

clipboard.on('success', function (click) {
  const btn = $(click.trigger)
  setTooltip(btn, 'Copied')
  hideTooltip(btn)
})
