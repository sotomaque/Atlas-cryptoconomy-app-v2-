// system imports
import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SearchBar from 'react-native-searchbar';

const itemsList = ['Bitcoin', 'Litecoin', 'Ethereum'];
export default class Search extends Component {
  state = { items: [], searchText: '' };


  getResults() {
    if (this.state.items.length < 1 && this.state.searchText === '') {
      return itemsList;
    }

    return this.state.items;
  }

  handleResults(results) {
    this.setState({ items: results });
  }

  render() {
        return (
          <View style={styles.portfolioContainer}>
              <LinearGradient colors={['#1294D5', '#125AD5']} style={styles.linearGradient}>

                <SearchBar
                  data={itemsList}
                  backgroundColor='transparent'
                  handleResults={results => this.handleResults(results)}
                  iconColor='white'
                  textColor='white'
                  selectionColor='white'
                  iOSHideShadow
                  placeholderTextColor='white'
                  showOnLoad
                  focusOnLayout={false}
                  handleChangeText={text => this.setState({ searchText: text })}
                  onBack={() => this.props.navigation.goBack()}

                />
                <View style={{ height: 80 }} />

                <FlatList
                data={this.getResults()}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('addcoin')}
                  >
                    <Text style={{ padding: 20, fontSize: 24, color: 'white' }}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
                />

              </LinearGradient>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    portfolioContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    linearGradient: {
        flex: 1,
    },
    chartContainer: {
        paddingLeft: 6,
        paddingRight: 6,
    },
});
