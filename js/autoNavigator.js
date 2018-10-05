; (function () {

    var view = document.querySelector('nav.menu');
    var controller = {
        view: null,
        aTags: null,
        init: function (view) {
            this.view = view
            this.aTags = this.view.querySelectorAll("ul>li>a")
            this.bindEvents()
        },
        bindEvents: function () {
            for (var i = 0; i < this.aTags.length; i++) {
                this.aTags[i].addEventListener('click', function (e) {
                    this.autoNavigate(e)
                }.bind(this))
            }
        },
        animate: function (time) {
            requestAnimationFrame(this.animate.bind(this))
            TWEEN.update(time)
        },
        autoNavigate: function (e) {
            e.preventDefault();
            var aTag = e.currentTarget;
            var href = aTag.getAttribute('href')
            var element = document.querySelector(href);
            if (element == null) return;
            var endScrollPos = element.offsetTop - 80;
            var curScrollPos = window.scrollY;
            var distance = Math.abs(endScrollPos - curScrollPos);
            requestAnimationFrame(this.animate.bind(this));
            var coords = { y: curScrollPos };
            var tween = new TWEEN.Tween(coords)
                .to({ y: endScrollPos }, distance / 100 * 200)
                .easing(TWEEN.Easing.Quadratic.Out)
                .onUpdate(function () {
                    window.scrollTo(0, coords.y);
                })
                .start();
        }
    }
    controller.init(view)
})()
