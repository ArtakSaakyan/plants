console.log('1. При нажатии на кнопки:Gardens,Lawn,Planting происходит смена фокуса на услугах в разделе service +50 \n  • При выборе одной услуги (нажатии одной кнопки), остальные карточки услуг принимают эффект blur, выбранная услуга остается неизменной + 20 \n  • Пользователь может нажать одновременно две кнопки услуги, тогда эта кнопка тоже принимает стиль активной и карточки с именем услуги выходят из эффекта blur. При этом пользователь не может нажать одновременно все три кнопки услуг. При повторном нажатии на активную кнопку она деактивируется (становится неактивной) а привязанные к ней позиции возвращаются в исходное состояние (входит в состяние blur если есть еще активная кнопка или же перестають быть в блюре если это была единственная нажатая кнопка). +20 \n  • Анимации плавного перемещения кнопок в активное состояние и карточек услуг в эффект blur +10 \n2. Accordion в секции prices реализация 3-х выпадающих списков об услугах и ценах + 50 \n  • При нажатии на dropdown кнопку появляется описание тарифов цен в соответствии с макетом. Внутри реализована кнопка order, которая ведет на секцию contacts, при нажатии на нее Accordion все еще остается открытым. +25 \n  • Пользователь может самостоятельно закрыть содержимое нажав на кнопку dropup, но не может одновременно открыть все тарифы услуг, при открытии нового тарифа предыдущее автоматически закрывается. +25 \n3. В разделе contacts реализован select с выбором городов +25 \n  • В зависимости от выбора пользователя появляется блок с адресом и телефоном офиса в определенном городе +15 \n  • При нажатии на кнопку Call us реализован вызов по номеру, который соответствует выбранному городу +10 \n')

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
