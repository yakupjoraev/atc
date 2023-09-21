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
      delay: 5500,
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
const calculateSection = document.querySelectorAll('.calculate');

// Наблюдаем за каждым элементом
numberBlocks.forEach(block => {
  observer.observe(block);
});

calculateSection.forEach(block => {
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

});

function simpleFilter() {
  const container = document.querySelector('.projects__filter-wrapper');

  if (!container) {
    return null
  }

  // Получите все элементы с классом "projects__filter"
  const filterContainers = document.querySelectorAll('.projects__filter');

  // Добавьте обработчик события для каждого селекта
  filterContainers.forEach((container) => {
    const selected = container.querySelector('.projects__selected');
    const filterList = container.querySelector('.projects__filter-list');

    // При клике на селект
    selected.addEventListener('click', () => {
      // Добавьте класс "active" к фильтру и переключите стрелку
      filterList.classList.toggle('active');
      selected.querySelector('img').classList.toggle('active');
    });

    // При выборе элемента из списка
    filterList.addEventListener('click', (e) => {
      if (e.target.classList.contains('projects__filter-item')) {
        // Установите текст выбранного элемента в селекте
        selected.querySelector('span').textContent = e.target.textContent;

        // Удалите класс "active" у всех элементов списка
        filterList.querySelectorAll('.projects__filter-item').forEach((item) => {
          item.classList.remove('active');
        });

        // Добавьте класс "active" к выбранному элементу списка
        e.target.classList.add('active');

        // Удалите класс "active" из списка фильтра и переключите стрелку
        filterList.classList.remove('active');
        selected.querySelector('img').classList.remove('active');
      }
    });

  });

  // Закрыть список фильтра, если пользователь щелкает вне его
  document.addEventListener('click', (e) => {
    filterContainers.forEach((container) => {
      if (!container.contains(e.target)) {
        container.querySelector('.projects__filter-list').classList.remove('active');
        container.querySelector('.projects__selected img').classList.remove('active');
      }
    });
  });

}
simpleFilter();


function simpleParallax() {
  const container = document.querySelector('.calculate');

  if (!container) {
    return null
  }

  (function () {
    var indexOf = [].indexOf;

    if (indexOf.call(window, 'ontouchstart') === -1) {
      document.body.addEventListener('mousemove', function (e) {
        var moveX, moveY;
        moveX = e.pageX * -1 / 200 + 'px';
        moveY = e.pageY * -1 / 1000 + 'px';
        document.querySelector('.calculate').style.backgroundPosition = 'calc(50% + ' + moveX + ') calc(50% + ' + moveY + ')';
      });
    }

  })();

}

simpleParallax();

//плавный скролл
const anchors = document.querySelectorAll('a[href*="#"]')

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()

    const blockID = anchor.getAttribute('href').substr(1)

    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
};

const openModalBtns = document.querySelectorAll('.open-modal-btn');
const closeModalBtns = document.querySelectorAll('.close-modal-btn');
const modals = document.querySelectorAll('.modal');

openModalBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const modalId = btn.dataset.modalId;
    const modal = document.getElementById(modalId);
    modal.classList.add('show');
  });
});

closeModalBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const modal = btn.closest('.modal');
    modal.classList.remove('show');
  });
});

window.addEventListener('click', (event) => {
  if (event.target.classList.contains('modal')) {
    event.target.classList.remove('show');
  }
});
