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

    // const holdingPrice = price * quantity;
    // const priceInt = price.slice(1);
    // console.log('Prices :',price,priceInt);
    const priceHoldings = (price * quantity).toLocaleString();
    const totalPriceSymbol = (quantity ? `($${priceHoldings})` : '');
    const priceOrPercent = (priceOverPercent ? `$${(price * 1).toLocaleString()}` : `${percentChange}`);
			return (
          <View style={{ paddingBottom: 10 }}>
            <View style={styles.row}>

              <TouchableOpacity onPress={() => this.props.onPress()}>
                <Text style={styles.text} numberOfLines={1}>
                  {name}
                </Text>

                <View style={styles.row}>
                  <Text style={[styles.text, styles.name]} numberOfLines={1}>
                    {quantSymbol}
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: 15,
                width: Dimensions.get('window').width / 2.5,
              }}
              >
              <MiniLine
                stockData={stockPoints}
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
                <Text style={{ color: '#FBFCFC' }}>
                  {totalPriceSymbol}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
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
    color: '#FFFFFF',
    fontFamily: 'Avenir',
    fontSize: 16,
    fontWeight: '500',
  },
  name: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '300',
    paddingLeft: 0,
  },
});
