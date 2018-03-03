// system imports
import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SearchBar from 'react-native-searchbar';
import { Header } from '../components/Header';


const itemsList = ['Bitcoin', 'Litecoin', 'Ethereum'];
export default class Search extends Component {
  state = { items: [] };
  handleResults(results) {
  this.setState({ items: results });
  }

  getResults() {
    if (this.state.items.length < 1) {
      return itemsList;
    }
    return this.state.items;
  }
  /*
  <Header
    headerText='Search'
    nameLeft="arrow-circle-left"
    onPressRight={() => {}}
    onPressLeft={() => this.props.navigation.goBack()}
  />
  */
  render() {
        return (
          <View style={styles.portfolioContainer}>
              <LinearGradient colors={['#1294D5', '#125AD5']} style={styles.linearGradient}>

                <SearchBar
                  ref={ref => this.searchBar = ref}
                  data={itemsList}
                  handleResults={this.handleResults.bind(this)}
                  backgroundColor='transparent'
                  iconColor='white'
                  textColor='white'
                  selectionColor='white'
                  iOSHideShadow
                  placeholderTextColor='white'
                  showOnLoad
                  onBack={() => this.props.navigation.goBack()}

                />
                <View style={{ height: 80 }} />

                <FlatList
                data={this.getResults()}
                keyExtractor={item => item}
                renderItem={({ item }) => (<Text>{item}</Text>)}
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
