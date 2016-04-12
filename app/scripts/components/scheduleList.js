export default class ScheduleList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let template = this.props.data.map((item)=> {
            return (
                <tr>
                    <td>{item.flightNumber}</td>
                    <td>{item.departureAirportFsCode}</td>
                    <td>{item.arrivalAirportFsCode}</td>
                    <td>{item.departureTime}</td>
                    <td>{item.arrivalTime}</td>
                </tr>
            )
        });

        return (
            <div>
                <table className="bordered">
                    <thead>
                    <tr>
                        <th data-field="flight-number">Flight №</th>
                        <th data-field="dep-airport">From</th>
                        <th data-field="arr-airport">To</th>
                        <th data-field="dep-time">Departure Time</th>
                        <th data-field="arr-time">Arrival Time</th>
                    </tr>
                    </thead>
                    <tbody>
                    {template}
                    </tbody>
                </table>
            </div>
        )
    }
}