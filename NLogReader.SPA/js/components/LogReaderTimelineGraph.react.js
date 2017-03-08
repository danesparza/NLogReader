import {Component} from 'react';
import {BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import moment from 'moment'

//  The stores
import LogStore from '../stores/LogStore';

const data = [
      {time: new Date(2016,5,24, 3, 34, 54).getTime(), name: '1', debug: 300, error: 456},
      {time: new Date(2016,5,24, 4, 34, 54).getTime(), name: '2', debug: -145, error: 230},
      {time: new Date(2016,5,24, 5, 34, 54).getTime(), name: '3', debug: -100, error: 345},
      {time: new Date(2016,5,24, 6, 34, 54).getTime(), name: '4', debug: -8, error: 450},
      {time: new Date(2016,5,24, 7, 34, 54).getTime(), name: '5', debug: 100, error: 321},
      {time: new Date(2016,5,24, 7, 35, 54).getTime(), name: '6', debug: 9, error: 235},
      {time: new Date(2016,5,24, 7, 36, 54).getTime(), name: '7', debug: 53, error: 267},
      {time: new Date(2016,5,24, 7, 36, 56).getTime(), name: '8', debug: 252, error: -378},
      {time: new Date(2016,5,24, 8, 34, 54).getTime(), name: '9', debug: 79, error: -210},
      {time: new Date(2016,5,24, 9, 34, 54).getTime(), name: '10', debug: 294, error: -23},
      {time: new Date(2016,5,24, 10, 34, 54).getTime(), name: '12', debug: 43, error: 45},
      {time: new Date(2016,5,24, 11, 34, 54).getTime(), name: '13', debug: -74, error: 90},
      {time: new Date(2016,5,24, 12, 34, 54).getTime(), name: '14', debug: -71, error: 130},
      {time: new Date(2016,5,24, 13, 34, 54).getTime(), name: '15', debug: -117, error: 11},
      {time: new Date(2016,5,24, 14, 34, 54).getTime(), name: '16', debug: -186, error: 107},
      {time: new Date(2016,5,23, 3, 34, 54).getTime(), name: '17', debug: -16, error: 926},
      {time: new Date(2016,5,22, 3, 34, 54).getTime(), name: '18', debug: -125, error: 653},
      {time: new Date(2016,5,21, 3, 34, 54).getTime(), name: '19', debug: 222, error: 366},
      {time: new Date(2016,5,20, 3, 34, 54).getTime(), name: '20', debug: 372, error: 486},
      {time: new Date(2016,4,24, 3, 34, 54).getTime(), name: '21', debug: 182, error: 512},
      {time: new Date(2016,4,23, 3, 34, 54).getTime(), name: '22', debug: 164, error: 302},
      {time: new Date(2016,4,22, 3, 34, 54).getTime(), name: '23', debug: 316, error: 425},
      {time: new Date(2016,6,24, 3, 34, 54).getTime(), name: '24', debug: 131, error: 467},
      {time: new Date(2016,7,24, 3, 34, 54).getTime(), name: '25', debug: 291, error: -190},
      {time: new Date(2016,8,24, 3, 34, 54).getTime(), name: '26', debug: -47, error: 194},
      {time: new Date(2016,8,25, 6, 34, 54).getTime(), name: '27', debug: -415, error: 371},
      {time: new Date(2016,8,28, 5, 34, 54).getTime(), name: '28', debug: -182, error: 376},
      {time: new Date(2016,8,29, 3, 33, 54).getTime(), name: '29', debug: -93, error: 295},
      {time: new Date(2016,8,30, 3, 34, 54).getTime(), name: '30', debug: -99, error: 322},
      {time: new Date(2016,5,12, 3, 34, 54).getTime(), name: '31', debug: -52, error: 246},
      {time: new Date(2016,5,13, 3, 34, 54).getTime(), name: '32', debug: 154, error: 33},
      {time: new Date(2016,5,14, 3, 34, 54).getTime(), name: '33', debug: 205, error: 354},
      {time: new Date(2016,5,15, 3, 34, 54).getTime(), name: '34', debug: 70, error: 258},
      {time: new Date(2016,5,16, 3, 34, 54).getTime(), name: '35', debug: -25, error: 359},
      {time: new Date(2016,5,17, 3, 34, 54).getTime(), name: '36', debug: -59, error: 192},
      {time: new Date(2016,5,18, 3, 34, 54).getTime(), name: '37', debug: -63, error: 464},
      {time: new Date(2016,5,19, 3, 34, 54).getTime(), name: '38', debug: -91, error: -2},
      {time: new Date(2016,5,20, 3, 34, 54).getTime(), name: '39', debug: -66, error: 154},
      {time: new Date(2016,5,21, 3, 34, 54).getTime(), name: '40', debug: -50, error: 186}
    ];

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

        const sortedData = data.sort(function(a, b) {
  		    return a.time - b.time;
		});

        const dateFormat = (time) => {
            return moment(time).format('MM/DD ');
        };

        return (
            <div id='timelineGraph' className='collapse'>
                <BarChart width={600} height={200} data={sortedData}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <XAxis dataKey="time" tickFormatter={dateFormat}/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip labelFormatter={dateFormat}/>
                    <Legend verticalAlign="top" wrapperStyle={{lineHeight: '40px'}}/>
                    <ReferenceLine y={0} stroke='#000'/>
                    <Brush dataKey='time' height={30} stroke="#8884d8" tickFormatter={dateFormat}/>
                    <Bar dataKey="error" fill="#C70039" />
                    <Bar dataKey="debug" fill="#337DFF" />
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