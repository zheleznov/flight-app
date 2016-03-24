export default class Schedule extends React.Component {
    constructor(props){
        super(props);

    }

    componentDidMount(){
        window.getAirports();
    }

    render(){
        return (
            <div className="row">
                <div className="col s12 m8">
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <div className="section">
                                <span className="card-title">Departure Information</span>
                                <div className="row">
                                    <div className="input-field col s12 m10">
                                        <input className="validate departure-airports" name="departure-airports" type="text" id="departure-airports" ref="departure-airports" required autocomplete="off" />
                                        <input type="hidden" name="departure-air-code" id="departure-air-code" ref="departure-iata"/>
                                        <label for="departure-airports">Airport name or code...</label>
                                    </div>
                                </div>
                            </div>
                            <div class="divider"></div>
                            <div className="section">
                                <span className="card-title">Arrival Information</span>
                                <div className="row">
                                    <div className="input-field col s12 m10">
                                        <input className="validate arrival-airports" name="arrival-airports" type="text" id="arrival-airports" ref="arrival-airports" required autocomplete="off" />
                                        <input type="hidden" name="arrival-air-code" id="arrival-air-code" ref="arrival-iata"/>
                                        <label for="arrival-airports">Airport name or code...</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}