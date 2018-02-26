import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { connect } from 'react-redux';
// import  Icon  from 'react-native-vector-icons/FontAwesome';


export class Coin extends Component {

  props: {
      symbol: string,
      name: string,
      price: number,
    //  change: number,
    //  active: boolean,
      onPress: Function,
    };

	render() {
			// const width = Dimensions.get('window').width; // full device width, captured at runtime
      const {
      symbol,
      name,
      price,
    } = this.props;
			return (
        <TouchableOpacity
            onPress={() => this.props.onPress()}
        >
          <View style={styles.row}>
            <Text style={styles.text} numberOfLines={1}>
              {name}
            </Text>

          <View style={styles.row}>
            <Text style={[styles.text, styles.name]} numberOfLines={1}>
              {symbol}
            </Text>
          </View>

          <View style={styles.right}>
            <Text style={styles.text} numberOfLines={1}>
              {price}
            </Text>
          </View>

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
