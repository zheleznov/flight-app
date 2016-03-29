import router from './router.js';

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js')
        .then((registration)=> {
            console.log("Service Worker Registered", registration);
        })
        .catch((err)=> {
            console.log('Error', err)
        })
}

var $ = window.jQuery;

//
$(function () {

    $(".button-collapse").sideNav({
        menuWidth: 300, // Default is 240
        edge: 'right', // Choose the horizontal origin
        closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });
});




