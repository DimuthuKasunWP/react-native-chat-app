import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, TouchableHighlight } from "react-native";
import { ActionConst, Actions, Router, Scene } from "react-native-router-flux";
import {connect} from 'react-redux';
import {setupRoom} from '../actions/chatRoomActions';

 class EnterRoomScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: "",
            lastName: "",
            roomName: "",
            enterRoom: false
        }
        this.onSubmitEdit = this.onSubmitEdit.bind(this);
        this.enterRoom = this.enterRoom.bind(this);
    }
    componentDidMount() {
    }

    onSubmitEdit() {
        const { firstName, lastName } = this.state
        if (firstName && lastName) {
            this.setState({ enterRoom:true })
        } else {
            alert("please enter your name")
        }
    }

    enterRoom() {
        console.log(this.state, "state")
        const { firstName, lastName, roomName } = this.state
        const user = {
            _id: `${firstName}${lastName}`,
            name: `${firstName}${lastName}`,
            firstName: firstName,
            lastName: lastName,
            roomName: roomName,
            avatar: `https://firebasestorage.googleapis.com/v0/b/chat-app-71bd1.appspot.com/o/images%2Fme.jpg?alt=media&token=bc48310f-6dea-436f-b09d-9d3f5c57b126`
        }
        this.props.setupRoom(user);
        const {navigation} =this.props;
        navigation.navigate('ChatScreen',user);
        // Actions.chat({user})
    }
    render() {
        if (this.state.enterRoom) {
            return (
                <View style={styles.container}>
                    <Text> enter the name of the room </Text>
                    <TextInput
                        style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={(text) => this.setState({ roomName: text.toUpperCase() })}
                        placeholder="room name"
                    />
                    <TouchableHighlight onPress={this.enterRoom}>
                        <Text>Press here to enter the chat room</Text>
                    </TouchableHighlight>
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <Text> Enter Your Name </Text>
                <TextInput
                    style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(text) => this.setState({ firstName: text.trim() })}
                    placeholder="first name"
                    editable={true}
                    multiline={true}
                />
                <TextInput
                    style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(text) => this.setState({ lastName: text.trim() })}
                    placeholder="last name"
                    editable={true}
                    multiline={true}
                />
                <TouchableHighlight onPress={this.onSubmitEdit}>
                    <Text>Press when finished</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setupRoom: (values) => {dispatch(setupRoom(values))}
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    }
});

export default connect(null,mapDispatchToProps)(EnterRoomScreen)