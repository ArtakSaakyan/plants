const $mainMenu = $('#main-menu');
const $modalMenu = $('#modal-menu');
const $toggleMenu = $('[data-toggle-menu]');

function menuStatus(st, tl) {
  st = st || 0
  tl = tl || 0
  return (st > tl)
}

$toggleMenu
  .on('click', function() {
    if($modalMenu.hasClass('active')) {
      hideModal($modalMenu)
    }else{
      showModal($modalMenu)
    }
  })
