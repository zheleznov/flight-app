import render from './render.js';

let router = (function () {
    let navLinks = Array.from(document.querySelectorAll('.main-navigation a, .side-navigation a, .brand-logo')),
        onLoadPage = location.hash.replace('#', '');

    //made active menu on page load
    if(onLoadPage) document.querySelector('.main-navigation a[data-page*="' + onLoadPage + '"]').parentNode.classList.add('active');

    //clear all active links
    let clearActive = function () {
        navLinks.forEach((elem)=> {
            elem.parentNode.classList.remove('active');
        });
    };

    //events on nav link
    navLinks.forEach(function (elem) {
        elem.addEventListener('click', function (e) {
            let page = this.dataset.page;

            e.preventDefault();

            location.hash = page;
            clearActive();
            this.parentNode.classList.add('active');

            render.initPage(page);
        });
    });

    //render target page on page load
    render.initPage(onLoadPage);
})();

export default router;