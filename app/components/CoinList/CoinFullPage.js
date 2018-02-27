import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
// import { sendTickerAndName } from '../../actions';

// import  Icon  from 'react-native-vector-icons/FontAwesome';


class CoinFullPage extends Component {
	render() {
			// const width = Dimensions.get('window').width; // full device width, captured at runtime
      const {
      ticker,
      name,
      price,
    } = this.props;
			return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.text} numberOfLines={1}>
            {name}
          </Text>

          <View style={styles.row}>
            <Text style={[styles.text, styles.name]} numberOfLines={1}>
              {ticker}
            </Text>
          </View>

          <View style={styles.right}>
            <Text style={styles.text} numberOfLines={1}>
              {price}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
          >
            <Text>Press here to go back</Text>
          </TouchableOpacity>
        </View>
			);
    }
}


const styles = StyleSheet.create({

});

const mapStateToProps = (state) => {
  const { name, ticker } = state.coinPageReducer;
  return { name, ticker };
};

export default connect(mapStateToProps, { })(CoinFullPage);
