; (function () {
    var view = document.querySelector('#swiper')
    var controller = {
        view: null,
        swiper: null,
        swiperOptions: {
            direction: 'horizontal',
            loop: true,
            pagination: {
                el: '.swiper-pagination',
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        },
        init: function(view) {
            this.view = view
            this.swiper  = this.initSwiper()
        },
        initSwiper: function() {
            var swiper = new Swiper(this.view.querySelector('.swiper-container'), this.swiperOptions)
            return swiper
        }
    }
    controller.init(view)
})()
