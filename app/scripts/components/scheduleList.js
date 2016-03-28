import ScheduleListItem from './schedule-list-item.js';

export default class ScheduleList extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        let data = this.props.data;

        return(
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
                        <ScheduleListItem data={data}/>
                    </tbody>
                </table>
            </div>
        )
    }
}