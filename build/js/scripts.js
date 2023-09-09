// Custom Scripts
// Custom scripts
// Мобильное меню бургер
function burgerMenu() {
  const burger = document.querySelector('.burger')
  const menu = document.querySelector('.menu')
  const body = document.querySelector('body')
  burger.addEventListener('click', () => {
    if (!menu.classList.contains('active')) {
      menu.classList.add('active')
      burger.classList.add('active-burger')
      body.classList.add('locked')
    } else {
      menu.classList.remove('active')
      burger.classList.remove('active-burger')
      body.classList.remove('locked')
    }
  })
  //снять классы при клике на элементы меню
  const menuItems = document.querySelectorAll('.menu__item')

  menuItems.forEach(item => {
    item.addEventListener('click', function () {
      menu.classList.remove('active')
      burger.classList.remove('active-burger')
      body.classList.remove('locked')
    })
  });

  // Вот тут мы ставим брейкпоинт навбара
  window.addEventListener('resize', () => {
    if (window.innerWidth > 991.98) {
      menu.classList.remove('active')
      burger.classList.remove('active-burger')
      body.classList.remove('locked')
    }
  })
}
burgerMenu()


// Вызываем эту функцию, если нам нужно зафиксировать меню при скролле.
function fixedNav() {
  const nav = document.querySelector('nav')

  // тут указываем в пикселях, сколько нужно проскроллить что бы наше меню стало фиксированным
  const breakpoint = 1
  if (window.scrollY >= breakpoint) {
    nav.classList.add('fixed__nav')
  } else {
    nav.classList.remove('fixed__nav')
  }
}
window.addEventListener('scroll', fixedNav)


function revievsSlider() {
  const container = document.querySelector('.revievs');

  if (!container) {
    return null
  }

  const swiper = new Swiper(".revievs__slider", {
    slidesPerView: 1.5,
    spaceBetween: 7,
    mousewheel: true,
    pagination: {
      el: ".revievs__slider-pagination",
    },

    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1.5,
        spaceBetween: 7,
      },
      // when window width is >= 767px
      767: {
        slidesPerView: 2.5,
        spaceBetween: 10,
      },
      // when window width is >= 992px
      992: {
        slidesPerView: 3.5,
        spaceBetween: 14,
      }
    }
  });
}
revievsSlider();

function heroSlider() {
  const container = document.querySelector('.hero');

  if (!container) {
    return null
  }

  const swiper = new Swiper(".hero__slider", {
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },

    pagination: {
      el: ".hero__slider-pagination",
    },

    navigation: {
      nextEl: ".hero__slider--next",
      prevEl: ".hero__slider--prev",
    },
  });
}
heroSlider();

function gallerySlider() {
  const container = document.querySelector('.gallery');

  if (!container) {
    return null
  }

  const swiper = new Swiper(".gallery__slider", {
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  });
}
gallerySlider();

// Функция, которая будет вызываться при появлении элемента в поле видимости
function handleIntersection(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Добавляем класс, когда элемент появляется в поле видимости
      entry.target.classList.add('visible');
      // Отключаем наблюдение для данного элемента после добавления класса (если это нужно)
      observer.unobserve(entry.target);
    }
  });
}

// Создаем экземпляр IntersectionObserver
const observer = new IntersectionObserver(handleIntersection, {
  root: null, // Используем viewport как корневой элемент
  rootMargin: '0px', // Можете настроить отступы, если нужно
  threshold: 0.5, // Порог видимости (0.5 означает, что элемент будет считаться видимым, когда половина его видна)
});

// Получаем все элементы с классом "number-block"
const numberBlocks = document.querySelectorAll('.number-block');

// Наблюдаем за каждым элементом
numberBlocks.forEach(block => {
  observer.observe(block);
});



window.addEventListener('DOMContentLoaded', () => { // Структура страницы загружена и готова к взаимодействию

  const countNums = () => { // объявляем функцию, чтобы всё, что относится к анимированию чисел было в одном месте
    const numbersObserver = new IntersectionObserver((entries, observer) => { // создаём наблюдатель за элементами, в которых будем увеличивать значение числа
      entries.forEach(entry => { // для каждого наблюдаемого элемента
        if (entry.isIntersecting) { // проверяем, находится ли он в видимой области браузера
          const count = new CountUp( // настраиваем новую анимацию для числа
            entry.target.id, // 1. задаём идентификатор элемента с числом
            0, // 2. задаём начальное число
            entry.target.dataset.num, // 3. задаём конечное число (берем из data-атрибута)
            0, // 4. задаём количество цифр после запятой
            entry.target.dataset.duration || 4, // 5. задаём продолжительность анимации в секундах (если у элемента есть атрибут data-duration, то берём из него значение, иначе назначаем 4 секунды по-умолчанию)
            { // указываем дополнительные параметры
              separator: ' ', // задаём разделитель групп разрядов (например для миллиона - 1 000 000)
              prefix: entry.target.dataset.prefix || '', // задаём префикс - любые символы перед числом (берем значение из data-prefix, если не указано - то задаем пустую строку по умолчанию)
              suffix: entry.target.dataset.suffix || '' // задаём суффикс - любые символы после числа (берем значение из data-suffix, если не указано - то задаем пустую строку по умолчанию)
            }
          );
          count.start(() => { // запускаем настроенную анимацию и по окончании анимации...
            entry.target.parentElement.classList.add('numbers__item_done') // ...добавляем активный класс родительскому элементу
          })
          observer.unobserve(entry.target); // отключаем наблюдение за элементом
        }
      })
    });
    document.querySelectorAll('.project__counts-sum span').forEach(num => { // ищем элементы за которыми будем наблюдать, и для каждого...
      numbersObserver.observe(num) // ...запускаем наблюдение
    })
  }
  countNums() // запускаем объявленную функцию

})

