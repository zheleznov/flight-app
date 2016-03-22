export default class AirportInfo extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let data = this.props.data;

        return (
            <div className="mdl-cell mdl-cell--9-col">
                <h5>Airport Information</h5>
                <p><strong>Airport Name: </strong> {data.name}</p>
                <p><strong>Airport (IATA) Code: </strong> {data.iata}</p>
                <h5>Address</h5>
                <p><strong>City: </strong> {data.name}</p>
                <p><strong>State: </strong> {data.state.name} ({data.state.abbr})</p>
                <p><strong>Country: </strong> {data.country.name} ({data.country.iso})</p>
                <h5>Mapping</h5>
                <p><strong>Latitude: </strong> {data.latitude}</p>
                <p><strong>Longitude: </strong> {data.longitude}</p>
            </div>
        )
    }
}