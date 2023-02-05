// console.log('1. Вёрстка соответствует макету. Ширина экрана 768px +24\n  • блок <header> +2\n  • секция welcome +3\n  • секция about +4\n  • секция service +4\n  • секция prices +4\n  • секция contacts +4\n  • блок <footer> + 3\n2. Вёрстка соответствует макету. Ширина экрана 380px +24\n  • блок <header> +2\n  • секция welcome +3\n  • секция about +4\n  • секция service +4\n  • секция prices +4\n  • секция contacts +4\n  • блок <footer> + 3\n3. Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15\n  • нет полосы прокрутки при ширине страницы от 1440рх до 380px +7\n  • нет полосы прокрутки при ширине страницы от 380px до 320рх +8\n4. На ширине экрана 380рх и меньше реализовано адаптивное меню +22 (Допускается появление адаптивного меня на ширине более 380, но не допускается на ширине более 770px)\n  • при ширине страницы 380рх панель навигации скрывается, появляется бургер-иконка +2\n  • при нажатии на бургер-иконку плавно появляется адаптивное меню +4\n  • адаптивное меню соответствует цветовой схеме макета +4\n  • при нажатии на крестик адаптивное меню плавно скрывается уезжая за экран +4\n  • ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям +4\n  • при клике по ссылке в адаптивном меню адаптивное меню плавно скрывается, также скрытие меню происходит если сделать клик вне данного окна +4\n')

window.onload = function() {
  const body = document.body
  const burger = document.getElementById('burgerButton')
  const menu = document.getElementById('menu')
  const menuLinks = menu.querySelectorAll("li")

  // Меню
  burger.addEventListener('click', function () {
    body.classList.toggle('hidden')
    burger.classList.toggle('open')
    menu.classList.toggle('show')
  })

  // Список меню
  menuLinks.forEach((link) => {
    link.onclick = () => {
      if (menu.classList.contains('show')) {
        body.classList.toggle('hidden')
        burger.classList.toggle('open')
        menu.classList.toggle('show')
      }
    }
  })

  const serviceButtons = document.querySelector('.service-buttons')
  const serviceBtnList = serviceButtons.querySelectorAll('.service-btn')
  const serviceList = document.querySelector('.service-list')
  const serviceItemList = serviceList.querySelectorAll('.service-item')

  // Получаем список элементов, которые не совпадают с выбранной категорией
  function updateServiceList(categories) {
    serviceItemList.forEach(item => {
      let itemService = item.getAttribute('service')
      if (categories.includes(itemService) !== true) {
        console.log(item)
        item.classList.add('blur')
      }
    })
  }

  // Удаляем blur
  function removeServiceBlur() {
    serviceItemList.forEach(item => {
      item.classList.remove('blur')
    })
  }

  // Добавляем blur
  function addServiceBlur(item) {
    if (serviceCategory.includes(item.id)) {
      let index = serviceCategory.indexOf(item.id);
      if (index !== -1) serviceCategory.splice(index, 1);
    } else {
      serviceCategory.push(item.id)
    }

    item.classList.toggle('active')

    removeServiceBlur()
    console.log(serviceCategory.length)
    if (serviceCategory.length > 0) {
      updateServiceList(serviceCategory)
    }
  }

  let serviceCategory = []

  // Service Кнопки
  serviceBtnList.forEach(item => {
    item.addEventListener('click', function() {
      if (serviceCategory.length < 2) {
        addServiceBlur(this)
      } else {
        if (item.classList.contains('active')) {
          addServiceBlur(this)
        }
      }
    })
  })

  const pricesList = document.querySelector('.prices-list')
  const pricesItems = pricesList.querySelectorAll('.prices-item')

  // Закрываем все вкладки Prices
  function closePrices() {
    pricesItems.forEach(item => item.classList.remove('open'))
  }

  // Прайс
  pricesItems.forEach(item => {
    item.addEventListener('click', function() {
      if (this.classList.contains('open')) {
        this.classList.toggle('open')
      } else {
        closePrices()
        this.classList.toggle('open')
      }
    })
  })

  // Прайс кнопка order
  const pricesOrder = document.querySelectorAll('.prices-item__info-order')

  pricesOrder.forEach(item => {
    item.addEventListener('click', function() {
      // При клике на кнопку order вызывается и второе событие pricesItems, которое написано выше, эту проблему нужно решить, а так код выполняет свою функцию. Проверить можно через alert()
      this.parentNode.parentNode.classList.toggle('open')
    })
  })

  // Контакты
  const contactsAddress = document.getElementById('contactsAddress')
  const contactsAddressInfo = document.getElementById('contactsAddressInfo')
  const contactsAddressList = document.querySelector('.contacts-address__list')
  const contactsLinks = contactsAddressList.querySelectorAll('.contacts-address__item')

  contactsAddressInfo.addEventListener('click', function () {
    contactsAddress.classList.toggle('open')
  })

  let contactCity = document.getElementById('contactCity')
  let contactPhone = document.getElementById('contactPhone')
  let contactAddress = document.getElementById('contactAddress')
  let contactCall = document.getElementById('contactCall')

  contactsLinks.forEach(item => {
    item.addEventListener('click', function() {
      contactsAddress.classList.add('active')
      contactsAddress.classList.toggle('open')
      contactCity.innerHTML = this.getAttribute('city')
      contactPhone.innerHTML = this.getAttribute('phone')
      contactAddress.innerHTML = this.getAttribute('address')
    })
  })

  // Контакты Call us
  contactCall.addEventListener('click', function () {
    window.open(`tel:${contactPhone.textContent}`, '_self');
  })
}
