$('#header-slider').slick({
  pauseOnHover: false,
  pauseOnFocus: false,
  autoplay: true,
  autoplaySpeed: 4000,
  delay: 1000,
  fade: true,
  dots: true,
  arrows: false,
  responsive: [{
    breakpoint: 768,
    settings: {
      dots: false,
    }
  }]
})
const $header = $('#header')
let headerHeight = $header.outerHeight()


