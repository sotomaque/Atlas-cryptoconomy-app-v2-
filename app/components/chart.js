import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
// import Line from './chart/Line.js';
import Line from './chart/Line.js';

export default class Chart extends Component {
  props: {
    xVal: number,
    data: Array<number>,
  };

  render() {
    return (
      <View style={styles.container}>
        <Line
          values={this.props.data}
          xVal={this.props.xVal}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 55,
    paddingTop: 10,
    paddingBottom: 10,
  },
});
