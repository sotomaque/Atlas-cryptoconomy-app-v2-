import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';

const Header = (props) => {
    return (
        <View style={styles.viewStyle}>
            <Icon name="user-circle" size={20} color="#fff" />
            <Text style={styles.textStyle}>{props.headerText}</Text>
            <Icon name="search" size={20} color="#fff" />
        </View>
    );
};

export { Header };
