import router from './router.js';
import idb from './idb.js';

//serviceWorker registration
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js')
        .then((registration)=> {
            console.log("Service Worker Registered", registration);
            if(!navigator.serviceWorker.controller) return;

            if(registration.waiting) {
                //TODO: run update
                return;
            }

            if(registration.installing) {
                //TODO: run installing (registration.installing)
            }
        })
        .catch((err)=> {
            console.log('Error', err)
        })
}

//working with IndexedDB
let dbPromise = idb.open('flight-db', 2, upgradeDB=> {
    switch(upgradeDB.oldVersion){
        case 0:
            let keyValStore = upgradeDB.createObjectStore('testing');
            keyValStore.put('Tomas', 'cat');
        case 1:
            upgradeDB.createObjectStore('people', {keyPath: 'name'});
    }

});

dbPromise.then(db=> {
    let tx = db.transaction('testing');
    let keyValStore = tx.objectStore('testing');
    return keyValStore.get('cat');
}).then(val=> {
    console.log(val);
});


//side navigation
var $ = window.jQuery;
$(function () {

    $(".button-collapse").sideNav({
        menuWidth: 300, // Default is 240
        edge: 'right', // Choose the horizontal origin
        closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });
});




