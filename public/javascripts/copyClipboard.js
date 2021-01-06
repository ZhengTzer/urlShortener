function copyClipboard(x) {
  const clipboard = document.getElementById(x).value
  const dummy = $('<textarea>').val(clipboard).appendTo('body').select()
  document.execCommand('copy')
  $(dummy).remove()
}
