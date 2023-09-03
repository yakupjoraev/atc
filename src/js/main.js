// Custom scripts
const swiper = new Swiper(".revievs__slider", {
  slidesPerView: 1.5,
  spaceBetween: 7,
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