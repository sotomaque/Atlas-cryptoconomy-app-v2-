import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from './styles';

const Header = (props) => {
  const nav = props.navigation;
    // onPress={} Just for testing purpopses, we will pass
    // router navigation on it and Icon names as well to make
    // the header modular.
    return (
        <View style={styles.viewStyle}>
          <TouchableOpacity onPress={() => nav.navigate('profile')}>
            <Icon
              name="user-circle"
              size={20}
              color="#fff"
            />
          </TouchableOpacity>
            <Text style={styles.textStyle}>{props.headerText}</Text>
            <Icon name="search" size={20} color="#fff" />
        </View>
    );
};

export { Header };
