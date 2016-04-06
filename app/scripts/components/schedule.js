import * as helpers from '../helpers.js';
import ScheduleList from './scheduleList.js';

export default class Schedule extends React.Component {
    constructor(props) {
        super(props);

        this.getSchedule = this.getSchedule.bind(this);
    }

    getSchedule() {
        let data = {
            depIata: ReactDOM.findDOMNode(this.refs['departure-iata']).value,
            arrIata: ReactDOM.findDOMNode(this.refs['arrival-iata']).value,
            date: {
                year: new Date().getFullYear(),
                month: new Date().getMonth() + 1,
                day: new Date().getDate()
            }
        };

        //activate preloader
        document.querySelector('.preloader-wrapper').classList.remove('hide');

        //get data from the server
        helpers
            .getSchedule(data)
            .then((response)=> {
                //save response from server to idb
                helpers.saveToDB(data, response.scheduledFlights);

                //show results
                document.querySelector('.preloader-wrapper').classList.remove('hide');

                ReactDOM.render(
                    <ScheduleList data={response.scheduledFlights}/>,
                    document.querySelector('.main-content > .row > .col:last-child')
                )
            })
            .catch((err)=> {
                //show content if we have offline mode
                let key = data.depIata + '-' + data.arrIata;

                if(localStorage[key]) {
                    document.querySelector('.preloader-wrapper').classList.remove('hide');

                    ReactDOM.render(
                        <ScheduleList data={JSON.parse(localStorage[key])}/>,
                        document.querySelector('.main-content > .row > .col:last-child')
                    )
                }

                //throw new Error(err);
            })
    }

    componentDidMount() {
        ReactDOM.findDOMNode(this.refs['departure-airports']).focus();
        helpers.autoComplete();
        helpers.datePicker();
    }

    render() {
        return (
            <div className="row">
                <div className="col s12 m5">
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <form className="schedule-from">
                                <span className="card-title">Schedule Form</span>
                                <div className="row">
                                    <div className="input-field col s12 m10">
                                        <input className="validate departure-airports" name="departure-airports"
                                               type="text" id="departure-airports" ref="departure-airports" required
                                               autocomplete="off"/>
                                        <input type="hidden" name="departure-air-code" id="departure-air-code"
                                               ref="departure-iata"/>
                                        <label for="departure-airports">Departure Airport name or code...</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12 m10">
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
                                        <a onClick={this.getSchedule} className="waves-effect waves-light btn disabled">Get
                                            Schedule</a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col s12 m7 center-align">
                    <div className="preloader-wrapper big  active hide">
                        <div className="spinner-layer spinner-blue-only">
                            <div className="circle-clipper left">
                                <div className="circle"></div>
                            </div>
                            <div className="gap-patch">
                                <div className="circle"></div>
                            </div>
                            <div className="circle-clipper right">
                                <div className="circle"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}