import React, { Component } from 'react';
import { View, Dimensions, PanResponder } from 'react-native';
import { connect } from 'react-redux';
import  Icon  from 'react-native-vector-icons/FontAwesome';

//import { LineChart } from "react-native-svg-charts";
import { CoinListStyles } from './styles';
import { sendChartData } from '../../actions';


export class CoinList extends Component {



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
				<View style={{ flexDirection: 'column', width }}>
						<Icon name="bitcoin" size={30} color="#900" />
				</View>
			);
    }
}

// references
// https://github.com/JesperLekland/react-native-svg-charts#common-props

function mapStateToProps(store) {
  return {
		filter: store.stockFilterReducer.filter,
		stockList: store.stockFilterReducer.stockList,
		stockData: store.stockFilterReducer.stockData,
		selectedPoint: store.stockFilterReducer.selectedPoint,
		endPoint: store.stockFilterReducer.endPoint
  };
}

//export const StockLineChartWrapper = connect(mapStateToProps, { sendChartData })(StockLineChart);
