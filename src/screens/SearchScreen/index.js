import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import MessageList from 'src/components/MessageList';

export default class SearchScreen extends Component {
    render() {
        return (
               <View style={styles.container}>
          
                  <MessageList navigation={this.props.navigation} />
            </View>
        );
    }
}
