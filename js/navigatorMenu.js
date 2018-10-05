;(function () {

    let view = document.querySelector('nav.menu')
    let navSubMenusTrigger = view.querySelectorAll("ul>li");

    for (let i = 0; i < navSubMenusTrigger.length; i++) {
        navSubMenusTrigger[i].addEventListener('mouseenter', function (e) {
            enableSubMenu(e, true);
        });
        navSubMenusTrigger[i].addEventListener('mouseleave', function (e) {
            enableSubMenu(e, false);
        });
    }

    function enableSubMenu(e, isEnable) {
        let curElement = e.currentTarget;
        isEnable ? curElement.classList.add('actived') : curElement.classList.remove('actived');
    }

})();

