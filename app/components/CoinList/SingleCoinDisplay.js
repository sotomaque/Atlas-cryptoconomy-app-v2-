import React, { Component } from 'react';
import { View, Dimensions, Text } from 'react-native';
import { connect } from 'react-redux';
import  Icon  from 'react-native-vector-icons/FontAwesome';

//import { LineChart } from "react-native-svg-charts";
import { CoinListStyles } from './styles';
import { sendChartData } from '../../actions';


export class SingleCoinDisplay extends Component {

	constructor(props){
		super(props);
		console.log('SingleCoinDisplay', props);
	}

	// componentWillMount() {
	// 	this.panResponder = PanResponder.create({
	// 		onMoveShouldSetResponderCapture: () => true,
	// 		onMoveShouldSetPanResponderCapture: () => true,
	// 		/*
	// 		onPanResponderGrant: (evt, gestureState) => {
	// 		//	console.log('PanResponder start');
	// 		},
	// 		*/
	// 		onPanResponderRelease: () => {
	// 			this.setState({ xVal: -1 });
	// 			//console.log(this.props.selectedPoint);
	// 			},
	//
	// 	/*
	// 	onMoveShouldSetPanResponder: (e, gestureState) => {
	//
	// 	},
	// 	*/
	// 		onPanResponderMove: (e) => {
	// 			const { nativeEvent } = e;
	// 			// console.log(gestureState.dx);   // to get total distance moved since gesture start.
	// 			this.setState({ xVal: nativeEvent.locationX });
	// 			}
	// 	});
	// }

	// componentDidMount() {
	// 	setTimeout(() => {
	// 		return this.props.stockList
	// 			.then((res) => {
	// 				this.props.sendChartData(res);
	// 				this.setState({
	// 					stockList: res,
	// 				});
	// 			});
	// 	}, 1000);
	// }

	render() {
			const width = Dimensions.get('window').width; // full device width, captured at runtime
			return (
				<View style={{flexDirection:'row', flexWrap:'wrap'}}>
					<Icon name={this.props.data.url} size={30} color="#4F8EF7"/>
					<Text>{this.props.data.key}</Text>
					<Text>{this.props.data.price}</Text>
				</View>
			);
    }
}

// references
// https://github.com/JesperLekland/react-native-svg-charts#common-props

//export const StockLineChartWrapper = connect(mapStateToProps, { sendChartData })(StockLineChart);
