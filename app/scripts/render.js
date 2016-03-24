import About from './components/about.js';
import Contacts from './components/contacts.js';
import Airports from './components/airports.js';
import Schedule from './components/schedule.js';

let render = (function () {
    let reactContainer = document.querySelector('.main-content');

    let renderPage = function (page) {
        if(page === 'about') {
            ReactDOM.render(
                <About/>,
                reactContainer
            )
        }

        if(page === 'contacts') {
            ReactDOM.render(
                <Contacts/>,
                reactContainer
            )
        }

        if(page === 'airports') {
            ReactDOM.render(
                <Airports/>,
                reactContainer
            )
        }

        if(page === 'schedule'){
            ReactDOM.render(
                <Schedule/>,
                reactContainer
            )
        }

    };

    return {
        initPage(page){
            console.log(page)
            renderPage(page);
        }
    }
})();

export default render;