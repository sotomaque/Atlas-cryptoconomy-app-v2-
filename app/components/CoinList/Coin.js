import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import MiniLine from '../chart/MiniLine.js';
// import { connect } from 'react-redux';
// import  Icon  from 'react-native-vector-icons/FontAwesome';

// WE SHOULD AT SOME POINT MAKE '$' A CONSTANT THAT CAN BE CHANGED
// SO PEOPLE CAN USE OTHER CURRENCIES.
export class Coin extends Component {
  props: {
      symbol: string,
      name: string,
      price: number,
  //    change: number,
    //  active: boolean,
      percentChange: number,
      onPress: Function,
      onPressPrice: Function,
      priceOverPercent: bool,
      stockPoints: Object,
    };

	render() {
//      const width = Dimensions.get('window').width; // full device width, captured at runtime
      const {
      symbol,
      name,
      percentChange,
      quantity,
      price,
      priceOverPercent,
      stockPoints,
    } = this.props;

    // If quantity specified, prefix that to ticker
    const quantSymbol = (quantity ? `${quantity} ${symbol}` : symbol);

    const priceHoldings = (price * quantity).toLocaleString();

    const totalPriceSymbol = (quantity ? `($${priceHoldings})` : '');
    let lineColor = '#F9E79F'; // stagnant
     lineColor = percentChange.slice(0, -1) < 0 ? '#E74C3C' : lineColor; // red
     lineColor = percentChange.slice(0, -1) > 0 ? '#58D68D' : lineColor; // green
    const priceOrPercent = (priceOverPercent ? `$${(price * 1).toLocaleString()}` : `${percentChange}`);
			return (
          <TouchableOpacity
            onPress={() => this.props.onPress()}
            activeOpacity={0.5}
            style={{ padding: 20 }}
          >
            <View style={styles.row}>

              <View >
                <Text style={styles.text} numberOfLines={1}>
                  {name}
                </Text>

                <View style={styles.row}>
                  <Text style={[styles.text, styles.name, { fontSize: 14 }]} numberOfLines={1}>
                    {quantSymbol}
                  </Text>
                </View>
              </View>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: 35,
                width: Dimensions.get('window').width / 2.3,
              }}
              >
              <MiniLine
                stockData={stockPoints}
                colorLine={lineColor}
              />
              </View>
              <TouchableOpacity
                width={100}
                style={styles.right}
                onPress={() => this.props.onPressPrice()}
              >
                <Text style={styles.text} numberOfLines={1}>
                  {priceOrPercent}
                </Text>
                <Text style={[styles.text, { color: '#616A6B', fontSize: 14 }]} numberOfLines={1}>
                  {totalPriceSymbol}
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
			);
    }
}


const styles = StyleSheet.create({

  active: {
    backgroundColor: 'rgba(255,255,255,0.05)', // highlight selected coin
  },
  row: {
    flexDirection: 'row',
  },
  right: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  text: {
    color: '#616A6B',
    fontFamily: 'Avenir',
    fontSize: 16,
    fontWeight: '500',
  },
  name: {
    color: '#616A6B',
    fontSize: 16,
    fontWeight: '300',
    paddingLeft: 0,
  },
});
