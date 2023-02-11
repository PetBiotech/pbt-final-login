var swiper = new Swiper(".slide-content", {
    slidesPerView: 3,
    spaceBetween: 25,
    // slidesPerGroup:2,
    loop: true,
    centerSlide: "true",
    fade: 'true',
    grabCursor: 'true',
    // loopFillGroupWithBlank:true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    autoplay: {
        delay: 7000,
        disableOnInteraction: true,
    },

    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        520: {
            slidesPerView: 2,
        },
        950: {
            slidesPerView: 3,
        },
    },
});