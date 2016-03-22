import About from './components/about.js';
import Contacts from './components/contacts.js';
import Airports from './components/airports.js';

let render = (function () {
    let reactContainer = document.querySelector('.page-content');

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

    };

    return {
        initPage(page){
            renderPage(page);
           // console.log(reactPages[page])
        }
    }
})();

export default render;