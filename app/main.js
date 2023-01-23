console.log('1. Вёрстка соответствует макету. Ширина экрана 768px +24\n  • блок <header> +2\n  • секция welcome +3\n  • секция about +4\n  • секция service +4\n  • секция prices +4\n  • секция contacts +4\n  • блок <footer> + 3\n2. Вёрстка соответствует макету. Ширина экрана 380px +24\n  • блок <header> +2\n  • секция welcome +3\n  • секция about +4\n  • секция service +4\n  • секция prices +4\n  • секция contacts +4\n  • блок <footer> + 3\n3. Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15\n  • нет полосы прокрутки при ширине страницы от 1440рх до 380px +7\n  • нет полосы прокрутки при ширине страницы от 380px до 320рх +8\n4. На ширине экрана 380рх и меньше реализовано адаптивное меню +22 (Допускается появление адаптивного меня на ширине более 380, но не допускается на ширине более 770px)\n  • при ширине страницы 380рх панель навигации скрывается, появляется бургер-иконка +2\n  • при нажатии на бургер-иконку плавно появляется адаптивное меню +4\n  • адаптивное меню соответствует цветовой схеме макета +4\n  • при нажатии на крестик адаптивное меню плавно скрывается уезжая за экран +4\n  • ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям +4\n  • при клике по ссылке в адаптивном меню адаптивное меню плавно скрывается, также скрытие меню происходит если сделать клик вне данного окна +4\n')

window.onload = function() {
  const body = document.body
  const burger = document.getElementById('burgerButton')
  const menu = document.getElementById('menu')
  const links = menu.querySelectorAll("li")

  burger.addEventListener('click', function () {
    body.classList.toggle('hidden')
    burger.classList.toggle('open')
    menu.classList.toggle('show')
  })

  links.forEach((link) => {
    link.onclick = () => {
      if (menu.classList.contains('show')) {
        body.classList.toggle('hidden')
        burger.classList.toggle('open')
        menu.classList.toggle('show')
      }
    }
  })
}
