const phones = document.querySelectorAll('[type="tel"]')

phones.forEach(el => {
  IMask(el, {
    mask: '+{7} (000) 000-00-00',
  })
})
