import AirportInfo from './airport-info.js';
import * as helpers from '../helpers.js';

export default class Airports extends React.Component {
    constructor(props){
        super(props);

        this.getInfo = this.getInfo.bind(this);
    }

    getInfo(e){
        e.preventDefault();

        if(e.target.classList.contains('disabled')) return;

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

    componentDidMount(){
       helpers.autoComplete();
    }

    render() {
        return (
            <div className="row">
                <div className="col l12 s12">
                    <h5>Airports</h5>
                    <p>Welcome to airports database. Just type the name or airport code, select correct airport from the list and click 'Get Information' to get information about it</p>
                    <form className="airports-form" action="">
                        <div className="row">
                            <div className="input-field col s12 m4">
                                <input className="validate airports" name="airport" type="text" id="airport" ref="airport" required autocomplete="off"/>
                                <input type="hidden" name="air-code" id="air-code" ref="iata"/>
                                <label for="airport">Airport name or code...</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s4">
                                <a onClick={this.getInfo} className="waves-effect waves-light btn disabled">Get Information</a>
                            </div>
                        </div>
                        <div className="row airports-info"></div>
                    </form>
                </div>
            </div>
        )
    }
}