import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { connect } from 'react-redux';
// import  Icon  from 'react-native-vector-icons/FontAwesome';


export class Coin extends Component {
  props: {
      symbol: string,
      name: string,
      priceChange: number,
  //    change: number,
    //  active: boolean,
      onPress: Function,
      onPressPrice: Function
    };

	render() {
//      const width = Dimensions.get('window').width; // full device width, captured at runtime
      const {
      symbol,
      name,
      priceChange,
    } = this.props;
			return (
          <View>
            <View style={styles.row}>
              <TouchableOpacity
                  onPress={() => this.props.onPress()}
              >
              <Text style={styles.text} numberOfLines={1}>
                {name}
              </Text>

              <View style={styles.row}>
                <Text style={[styles.text, styles.name]} numberOfLines={1}>
                  {symbol}
                </Text>
              </View>
              </TouchableOpacity>

              <View style={styles.right}>
                <TouchableOpacity onPress={() => this.props.onPressPrice()}>
                  <Text style={styles.text} numberOfLines={1}>
                    {priceChange}
                  </Text>
                </TouchableOpacity>
              </View>
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
    alignSelf: 'flex-end',
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
    paddingLeft: 5,
  },
});
