import {Component} from 'react';
import {BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import moment from 'moment';

//  The stores
import LogStore from '../stores/LogStore';

class LogReaderTimelineGraph extends Component {

    constructor(props) {
        super(props);

        this.state = {
            logcountdata: LogStore.getHourlyLogData()
        };

        //  Bind our event handlers:
        this._onChange = this._onChange.bind(this);
    }

    componentDidMount() {
        //  Add store listeners ... and notify ME of changes
        this.logListener = LogStore.addListener(this._onChange);
    }

    componentWillUnmount() {
        //  Remove store listeners
        this.logListener.remove();
    }

    render() {

        const sortedData = this.state.logcountdata.sort(function(a, b) {
  		    return a.time - b.time;
		});

        //  Tooltip formatter
        const tipFormat = (time) => {
            return moment(time).format('MM/DD h:mma');
        };

        const dateFormat = (time) => {
            return moment(time).format('MM/DD');
        };

        return (
            <div id='timelineGraph' className='collapse'>
                <BarChart width={this.props.containerWidth - 50} height={200} data={sortedData}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <XAxis dataKey="time" tickFormatter={dateFormat}/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip labelFormatter={tipFormat}/>
                    <Legend verticalAlign="top" wrapperStyle={{lineHeight: '40px'}}/>
                    <ReferenceLine y={0} stroke='#000'/>
                    <Brush dataKey='time' height={30} stroke="#8884d8" tickFormatter={dateFormat}/>
                    <Bar dataKey="ErrorCount" fill="#C70039" name="Error" />
                    <Bar dataKey="DebugCount" fill="#337DFF" name="Debug"/>
                </BarChart>
            </div>
        );

    }

    _onChange() {
        this.setState({
            logcountdata: LogStore.getHourlyLogData()
        });
    }
}

export default LogReaderTimelineGraph