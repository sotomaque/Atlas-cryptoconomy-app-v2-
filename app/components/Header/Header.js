import React from 'react';
import { Text, View } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from './styles';

const Header = (props) => {
    return (
        <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>{props.headerText}</Text>
        </View>
    );
}

export { Header };