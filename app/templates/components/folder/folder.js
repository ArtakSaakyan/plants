const $folder = $('[data-folder]')
let isTablet = window.matchMedia('(max-width: 991px)').matches
let isPhone = window.matchMedia('(max-width: 767px)').matches

$folder
  .on('click', function () {
    const current = this
    const parent = this.closest('[data-accordion]')
    const subMenu = this.closest('[data-folder-body]')
    const target = this.dataset.folder
    const phoneOnly = !!this.dataset.phoneOnly
    const mobileOnly = !!this.dataset.mobileOnly
    const $b = $(`[data-folder-body="${target}"]`)
    console.log(!isTablet && mobileOnly)
    console.log(!isPhone && phoneOnly)
    if (!isTablet && mobileOnly) return false
    if (!isPhone && phoneOnly) return false
    if (this.classList.contains('active')) {
      if (!mobileOnly) this.classList.remove('active')
      $b.stop().slideUp(300, function () {
        current.classList.remove('active')
      })
    } else {
      if (parent && !subMenu) {
        parent.querySelectorAll('[data-folder]').forEach(el => el.classList.remove('active'))
        $('[data-folder-body]', $(parent)).stop().slideUp(300)
      }
      this.classList.add('active')
      $b.stop().slideDown(300)
    }
  })
