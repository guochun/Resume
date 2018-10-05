; (function () {
    var view = document.querySelector('#topNavBar')
    var controller = {
        view: null,
        isSticky: false,
        init: function(view) {
            this.view = view
            this.bindEvents()
        },
        bindEvents: function() {
            window.addEventListener('scroll', function () {
                if (window.scrollY > 0) {
                    if(!this.isSticky){
                        this.active()
                    }
                }else {
                    if(this.isSticky){
                        this.deactive()
                    }
                }
            }.bind(this))
        },
        active: function() {
            this.view.classList.add('sticky')
            this.isSticky = true;
        },
        deactive: function() {
            this.view.classList.remove('sticky')
            this.isSticky = false;
        }
    }
    controller.init(view)
})()
