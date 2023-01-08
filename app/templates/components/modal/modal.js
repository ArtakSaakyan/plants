const $modalShadow = $('#modal-shadow')
const $modalClose = $('[data-modal-close]')
const $modalOpen = $('[data-modal-open]')

function showModal(selector) {
  const target = selector.init ? selector : $(selector)
  console.log(target)
  if (!target.length) return false;
  $('html,body').css({
    overflow: 'hidden'
  })
  $modalShadow.stop().fadeIn(300)
  target.addClass('active')
}

function hideModal(selector) {
  // selector = selector || '[id*=modal]'
  // const target = selector.init ? selector : $(selector)
  // if (!target.length) return false;
  // $modalShadow.stop().fadeOut(300)
  // target.removeClass('active')
  $('html,body').css({
    overflow: 'auto'
  })
  $modalShadow.stop().fadeOut(300)
  $('[id*=modal]').removeClass('active')
}

$modalOpen
  .on('click', function(){
    const target = $(this).data('modal-open')
    showModal(target)
  })

$modalClose
  .on('click', function () {
    hideModal()
  })

$modalShadow
  .on('click', function () {
    hideModal()
  })
