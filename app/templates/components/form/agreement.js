const $agreement = $('[data-agreement]')

$agreement
  .on('change', function () {
    const $t = $(this)
    const $p = $t.parents('form').eq(0)
    $('[data-submit]', $p).attr({
      disabled: !$t.prop('checked')
    })
  })
