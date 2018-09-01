!(function () {

    setTimeout(function () {
        window.scrollTo(0,0);
        welcome.classList.remove('active');
        document.body.style.setProperty('overflow','visible');
    }, 1500)

    portfolioAll.addEventListener("click", function () {
        portfolioSelect.className = "selectBar state-pa";
    });
    portfolioFramework.addEventListener("click", function () {
        portfolioSelect.className = "selectBar state-pf";
    });
    portfolioVallia.addEventListener("click", function () {
        portfolioSelect.className = "selectBar state-pv";
    });

    let navItems = document.querySelectorAll('[data-navitems]');
    let lastNavItem = null;
    window.onscroll = function (e) {

        let ele = curScollCloseElement(navItems, window.scrollY);
        let navEle = document.querySelector('a[href="#'+ ele.id +'"]').parentNode;
        ele.classList.remove('offset');
        if(lastNavItem != null && ele !== lastNavItem) {
            let lastNavEle = document.querySelector('a[href="#'+ lastNavItem.id +'"]').parentNode;
         
            ele.classList.add('actived');
            lastNavItem.classList.remove('actived');
           
            lastNavEle.classList.remove('highlight');
            navEle.classList.add('highlight');
        }else {
            ele.classList.add('actived');
            navEle.classList.add('highlight');
        }
        lastNavItem = ele;
        if (window.scrollY > 0) {
            topNavBar.classList.add('sticky')
            
        } else {
            ele.classList.remove('actived');
            navEle.classList.remove('highlight');
            lastNavItem = null;
            topNavBar.classList.remove('sticky');
        }
        
       
       
    }

    let navSubMenusTrigger = document.querySelectorAll("nav.menu>ul>li");

    for (let i = 0; i < navSubMenusTrigger.length; i++) {
        navSubMenusTrigger[i].addEventListener('mouseenter', function (e) {
            enableSubMenu(e, true);
        });
        navSubMenusTrigger[i].addEventListener('mouseleave', function (e) {
            enableSubMenu(e, false);
        });
    }

    let aTags = document.querySelectorAll("nav.menu>ul>li>a");

    for (let i = 0; i < aTags.length; i++) {
        aTags[i].addEventListener('click', function (e) {
            e.preventDefault();
            let aTag = e.currentTarget;
            let href = aTag.getAttribute('href')
            let element = document.querySelector(href);
            if (element == null) return;
            let endScrollPos = element.offsetTop - 80;
            let curScrollPos = window.scrollY;
            let distance = Math.abs(endScrollPos - curScrollPos);
            requestAnimationFrame(animate);
            let coords = { y: curScrollPos };
            const tween = new TWEEN.Tween(coords) 
                    .to({ y: endScrollPos}, distance / 100 * 200)
                    .easing(TWEEN.Easing.Quadratic.Out)
                    .onUpdate(function () {
                        window.scrollTo(0,coords.y);
                    })
                    .start();
        });
    }

    function enableSubMenu(e, isEnable) {
        let curElement = e.currentTarget;
        isEnable ? curElement.classList.add('actived') : curElement.classList.remove('actived');
    }

    function animate(time) {
        requestAnimationFrame(animate);
        TWEEN.update(time);
    }

    function curScollCloseElement(elements, pos) {
        var minPos = Math.abs(elements[0].offsetTop - pos);
        var index = 0;
        for(let i = 1; i < elements.length; i ++){
            let distance = Math.abs(elements[i].offsetTop - pos);
            if(distance < minPos) {
                index = i;
                minPos = distance;
            }
        }
        return elements[index];
    }

    //未使用函数
    function getNextSiblingElement(element) {
        let sibling = element.nextSibling;
        while (sibling) {
            if (sibling.nodeType === Node.ELEMENT_NODE) {
                return sibling;
            }
            sibling = sibling.nextSibling;
        }
        return null;
    }
    function animateCreater(fn, startPos, endPos, interval, frame) {

        var id = null
        var speed = Math.floor((endPos - startPos) / interval);
        var current = startPos;
        var perTime = interval / frame;
        return function () {

            fn(current);
            current += speed * perTime;
            if (Math.abs(current - endPos) <= 0.01) {
                fn(endPos);
                clearTimeout(id);
                return;
            }
            id = setTimeout(arguments.callee, perTime * 1000, current, endPos, speed);
        };
    }

})();


