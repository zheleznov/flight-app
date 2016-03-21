import render from './render.js';

let router = (function () {
    let navLinks = Array.from(document.querySelectorAll('.main-navigation a, .drawer-navigation a')),
        onLoadPage = location.hash.replace('#', '');

    //clear all active links
    let clearActive = function () {
        navLinks.forEach((elem)=> {
            elem.classList.remove('active');
        });
    };

    //events on nav link
    navLinks.forEach(function (elem) {
        elem.addEventListener('click', function (e) {
            let page = this.dataset.page;

            e.preventDefault();

            location.hash = page;
            clearActive();
            this.classList.add('active');

            render.initPage(page);
        });
    });

    //render target page on page load
    render.initPage(onLoadPage);
})();

export default router;