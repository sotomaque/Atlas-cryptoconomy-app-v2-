import React, { Component } from 'react';
import { View, Dimensions, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';
import  Icon  from 'react-native-vector-icons/FontAwesome';
import TimerMixin from 'react-timer-mixin';

//import { LineChart } from "react-native-svg-charts";
import { CoinListStyles } from './styles';
import { sendStockListData } from '../../actions';
import { SingleCoinDisplay } from './SingleCoinDisplay';

import coinList	from '../../../app/lib/coin-list';


class CoinList extends Component {

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
	componentDidMount() {
		this.updateList();
	}

	timeout() {
		const self = this;
		setTimeout(() => {
			self.updateList();
		}, 10000); 
	}
	
	updateList(){
		coinList.getCoinListDetail(['BTC', 'ETH'])
			.then((res) => {
				this.props.sendStockListData(res);
				this.timeout();
			});
	}
	
	render() {
		const width = Dimensions.get('window').width; // full device width, captured at runtime
		return (
			<View style={{ flexDirection: 'column', width, backgroundColor: 'white' }}>
				<FlatList
					data={this.props.stockList}
					renderItem={({item, index})=>{
						return (<SingleCoinDisplay data={item}/>)
					}}>
				</FlatList>
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

export default connect(mapStateToProps, { sendStockListData })(CoinList);
