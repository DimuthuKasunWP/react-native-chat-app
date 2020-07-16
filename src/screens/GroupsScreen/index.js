import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import GroupsList from 'src/components/GroupsList';
import styles from './styles';

export default class GroupsScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                  <Button
                    icon="group"
                    mode="contained"
                    onPress={() => this.props.navigation.navigate('EnterRoomScreen')}
                >
                   Create Group
                </Button>
                <GroupsList />
            </View>
        );
    }
}
