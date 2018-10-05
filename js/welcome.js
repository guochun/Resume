; (function () {
    var view = document.querySelector('#welcome')
    setTimeout(function () {
        window.scrollTo(0, 0);
        view.classList.remove('active');
        document.body.style.setProperty('overflow', 'visible');
    }, 500)
})()
