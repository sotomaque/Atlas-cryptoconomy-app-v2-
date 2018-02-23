import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

export default class List extends Component {

  render() {
    return (
      <View style={styles.container}>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 45, // take 62% of the screen height
    backgroundColor: '#5DADE2',
  },
});
