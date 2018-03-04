import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from './styles';

const Header = (props) => {
//  const nav = props.navigation;
  const nameLeft = props.nameLeft;
  const nameRight = props.nameRight;
  const leftFunction = props.onPressLeft;
  const rightFunction = props.onPressRight;
    // onPress={} Just for testing purpopses, we will pass
    // router navigation on it and Icon names as well to make
    // the header modular.
    return (
        <View style={styles.viewStyle}>
          <TouchableOpacity onPress={() => leftFunction()}>
            <Icon
              name={nameLeft}
              size={22}
              color="#fff"
            />
          </TouchableOpacity>

          <Text style={styles.textStyle}>{props.headerText}</Text>
            <TouchableOpacity onPress={() => rightFunction()}>
              <Icon name={nameRight} size={22} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

export { Header };
