const $textCounter = $('[data-text-counter]')

$textCounter.each(function () {
  const $t = $(this)
  const $p = $t.parent()
  const limit = $t.attr('maxlength')
  const $current = $('[data-text-current]', $p)
  const $limit = $('[data-text-limit]', $p)
  $current.text(0)
  $limit.text(limit)
  $t
    .on('keyup', function () {
      const $t = $(this)
      const current = $t.val().length
      $current.text(current)
      current >= limit ? $t.addClass('limited') : $t.removeClass('limited')
    })
})
