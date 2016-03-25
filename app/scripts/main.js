import router from './router.js';
import {airportsAPIKey} from './configs.js';


let $ = window.jQuery;

//
$(function() {
    $(".button-collapse").sideNav({
        menuWidth: 300, // Default is 240
        edge: 'right', // Choose the horizontal origin
        closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });
});




