const $tabs = $('[data-tabs]')

$('[data-tab]', $tabs).eq(0).addClass('active')
$('[data-tab-body]', $tabs).eq(0).show()
$tabs
  .on('click', '[data-tab]', function () {
    const $t = $(this)
    const $p = $t.parents('[data-tabs]').eq(0)
    const trg = $t.data('tab')
    $('.active', $p).removeClass('active')
    $t.addClass('active')
    $('[data-tab-body]', $p).stop().fadeOut(300)
    $(`[data-tab-body="${trg}"]`).stop().fadeIn(300)
  })
