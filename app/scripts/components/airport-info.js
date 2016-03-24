export default class AirportInfo extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let data = this.props.data;

        return (
            <div className="col s12 m6">
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <div className="section">
                            <span className="card-title">Airport Information</span>
                            <p><strong>Airport Name: </strong> {data.name}</p>
                            <p><strong>Airport (IATA) Code: </strong> {data.iata}</p>
                        </div>
                        <div className="section">
                            <span className="card-title">Address</span>
                            <p><strong>City: </strong> {data.name}</p>
                            <p><strong>State: </strong> {data.state.name} ({data.state.abbr})</p>
                            <p><strong>Country: </strong> {data.country.name} ({data.country.iso})</p>
                        </div>
                        <div className="section">
                            <span className="card-title">Mapping</span>
                            <p><strong>Latitude: </strong> {data.latitude}</p>
                            <p><strong>Longitude: </strong> {data.longitude}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}