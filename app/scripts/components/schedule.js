import * as helpers from '../helpers.js';

export default class Schedule extends React.Component {
    constructor(props){
        super(props);

        this.getSchedule = this.getSchedule.bind(this);
    }

    getSchedule(){
        let data = {
            depIata: ReactDOM.findDOMNode(this.refs['departure-iata']).value,
            arrIata: ReactDOM.findDOMNode(this.refs['arrival-iata']).value,
            date: {
                year: new Date().getFullYear(),
                month: new Date().getMonth() + 1,
                day: new Date().getDate()
            }
        };

        let result = helpers.getSchedule(data);
    }

    componentDidMount(){
        helpers.autoComplete();
        helpers.datePicker();
    }

    render(){
        return (
            <div className="row">
                <div className="col s12 m6">
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <form className="schedule-from">

                                <span className="card-title">Schedule Form</span>
                                <div className="row">
                                    <div className="input-field col s12 m8">
                                        <input className="validate departure-airports" name="departure-airports"
                                               type="text" id="departure-airports" ref="departure-airports" required
                                               autocomplete="off"/>
                                        <input type="hidden" name="departure-air-code" id="departure-air-code"
                                               ref="departure-iata"/>
                                        <label for="departure-airports">Departure Airport name or code...</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12 m8">
                                        <input className="validate arrival-airports" name="arrival-airports"
                                               type="text" id="arrival-airports" ref="arrival-airports" required
                                               autocomplete="off"/>
                                        <input type="hidden" name="arrival-air-code" id="arrival-air-code"
                                               ref="arrival-iata"/>
                                        <label for="arrival-airports">Arrival Airport name or code...</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s4">
                                        <a onClick={this.getSchedule} className="waves-effect waves-light btn disabled">Get Schedule</a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}