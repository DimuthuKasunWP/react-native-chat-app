import React, { Component } from 'react';
import { View,ToastAndroid, } from 'react-native';
import { Button } from 'react-native-paper';
import PropTypes from 'prop-types';

import StatusList from 'src/components/StatusList';
import MessageList from 'src/components/MessageList';
import styles from './styles';
import {BackHandler} from 'react-native'

export default class MessagesScreen extends Component {
    onPress = () => {
        const { navigation } = this.props;
        navigation.navigate('CameraScreen');
    };

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress',()=>{

            //   ToastAndroid.show('exiting', ToastAndroid.SHORT);
            //   BackHandler.exitApp(0);
              return true;
        });
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', ()=> {

        //  ToastAndroid.show('exiting', ToastAndroid.SHORT);
        //  BackHandler.exitApp(0);
        return true;
        });
    }


    render() {
        return (
            <View style={styles.container}>
                {/* <StatusList /> */}
                {/* <Button
                    icon="add-a-photo"
                    mode="contained"
                    onPress={() => this.props.navigation.navigate('EnterRoomScreen')}
                >
                    Press me
                </Button> */}
                  <MessageList navigation={this.props.navigation} />
            </View>
        );
    }
}

MessagesScreen.propTypes = {
    navigation: PropTypes.object
};
