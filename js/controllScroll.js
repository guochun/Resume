; (function () {
    var  navItems = document.querySelectorAll('[data-navitems]');
    var lastNavItem = null;
    function curScollCloseElement(elements, pos) {
        var minPos = Math.abs(elements[0].offsetTop - pos);
        var index = 0;
        for (let i = 1; i < elements.length; i++) {
            let distance = Math.abs(elements[i].offsetTop - pos);
            if (distance < minPos) {
                index = i;
                minPos = distance;
            }
        }
        return elements[index];
    }

    window.addEventListener('scroll', function () {
        let ele = curScollCloseElement(navItems, window.scrollY);
        let navEle = document.querySelector('a[href="#' + ele.id + '"]').parentNode;
        ele.classList.remove('offset');
        if (lastNavItem != null && ele !== lastNavItem) {
            let lastNavEle = document.querySelector('a[href="#' + lastNavItem.id + '"]').parentNode;

            ele.classList.add('actived');
            lastNavItem.classList.remove('actived');

            lastNavEle.classList.remove('highlight');
            navEle.classList.add('highlight');
        } else {
            ele.classList.add('actived');
            navEle.classList.add('highlight');
        }
        lastNavItem = ele;
    })
})()

