import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import Line from './chart/line.js';

export default class Chart extends Component {
  //<Line values={[40, 30, 70, 60, 80, 70, 40, 70, 50]} />
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
    flex: 55, // take 38% of the screen height
    backgroundColor: '#252b2e',
    paddingTop: 20
  //  paddingLeft: 5,
  //  paddingRight: 5
  },
});
