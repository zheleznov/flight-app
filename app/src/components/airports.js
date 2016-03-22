import {fireBase} from '../configs.js';
import AirportInfo from './airport-info.js';

export default class Airports extends React.Component {
    constructor(props){
        super(props);

        this.state = {

        };

        this.getInfo = this.getInfo.bind(this);
    }

    getInfo(e){
        e.preventDefault();

        var iata = ReactDOM.findDOMNode(this.refs.iata).value;
        let airports = JSON.parse(localStorage.airports);

        airports.forEach((elem)=> {
            if(elem.iata === iata) {
                ReactDOM.render(
                    <AirportInfo data={elem}/>,
                    document.querySelector('.airports-info')
                )
            }
        });
    }

    render() {
        return (
            <div className="mdl-grid airports-page">
                <div className="mdl-cell mdl-cell--1-col"></div>
                <div className="mdl-cell mdl-cell--8-col">
                    <h5>Airports</h5>
                    <p>Welcome to airports database. Just type the name or airport code, select correct airport from the list and click 'Get Information' to get information about it</p>
                    <form className="airports-form" action="">
                        <div className="mdl-textfield mdl-js-textfield">
                            <input className="mdl-textfield__input airports" name="airport" type="text" id="airport" ref="airport" required/>
                            <input type="hidden" name="air-code" id="air-code" ref="iata"/>
                            <label className="mdl-textfield__label" for="name">Airport name or code...</label>
                        </div>
                        <button onClick={this.getInfo} className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored send-message">
                            Get Information
                        </button>
                        <div className="mdl-grid airports-info"></div>
                    </form>
                </div>
            </div>
        )
    }
}