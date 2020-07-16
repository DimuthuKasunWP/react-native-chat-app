// import React, { Component } from 'react';
// import { View } from 'react-native';
// import ChatMessenger from 'src/components/react-native-messenger';

// export default class ChatScreen extends Component {
//     onBackPress = () => {
//         this.props.navigation.goBack();
//     };
//     render() {
//         return (
//             <View style={{ flex: 1 }}>
//                 <ChatMessenger onBackPress={this.onBackPress} />
//             </View>
//         );
//     }
// }
import { ConfirmDialog,ProgressDialog } from 'react-native-simple-dialogs';
import React, { Component } from "react";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import {  Image, StatusBar } from 'react-native';
import { Appbar, withTheme } from 'react-native-paper';
import { ActionConst, Actions } from "react-native-router-flux";
import {connect} from 'react-redux';
import storage from '@react-native-firebase/storage';
import styles from 'src/components/react-native-messenger/Toolbar/styles';
import {
    View,
    Text,
    Platform,
    PermissionsAndroid,
    Dimensions,
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView
} from "react-native";
import { AudioRecorder, AudioUtils } from "react-native-audio";
import propTypes from "prop-types";
import Ionicons from "react-native-vector-icons/Ionicons";
import Sound from "react-native-sound";
import { firebaseDB } from "src/firebase";
import NavigationBar from "react-native-navbar";
import ImagePicker from 'react-native-image-picker'
// const ImagePicker = require("react-native-image-picker");

 class ChatScreen extends Component {
    static propTypes = {
        user: propTypes.object,
    };
    state = {
        messages: [],
        startAudio: false,
        hasPermission: false,
        audioPath: `${
            AudioUtils.DocumentDirectoryPath
            }/${this.messageIdGenerator()}test.aac`,
        playAudio: false,
        fetchChats: false,
        audioSettings: {
            SampleRate: 22050,
            Channels: 1,
            AudioQuality: "Low",
            AudioEncoding: "aac",
            MeteringEnabled: true,
            IncludeBase64: true,
            AudioEncodingBitRate: 32000
        }
    };
    componentWillMount() {
        console.log(this.props, "chat props")
        this.chatsFromFB = firebaseDB.ref(`/chat/${this.props.roomName}`);
        console.log(this.chatsFromFB, "chats from fb")
        this.chatsFromFB.on("value", snapshot => {
            console.log(snapshot.val(), "snap shot")
            if (!snapshot.val()) {
                this.setState({
                    fetchChats: true
                });
                return;
            }
            let { messages } = snapshot.val();
            messages = messages.map(node => {
                console.log(node, "node")
                const message = {};
                message._id = node._id;
                message.text = node.messageType === "message" ? node.text : "";
                message.createdAt = node.createdAt;
                message.user = {
                    _id: node.user._id,
                    name: node.user.name,
                    avatar: node.user.avatar
                };
                message.image = node.messageType === "image" ? node.image : "";
                message.audio = node.messageType === "audio" ? node.audio : "";
                message.messageType = node.messageType;
                return message;
            });
            this.setState({
                messages: [...messages]
            });
        });
    }
    componentDidMount() {
        this.checkPermission().then(async hasPermission => {
            this.setState({ hasPermission });
            if (!hasPermission) return;
            await AudioRecorder.prepareRecordingAtPath(
                this.state.audioPath,
                this.state.audioSettings
            );
            AudioRecorder.onProgress = data => {
                console.log(data, "onProgress data");
            };
            AudioRecorder.onFinished = data => {
                console.log(data, "on finish");
            };
        });
    }
    componentWillUnmount() {
        this.setState({
            messages: []
        });
    }

    checkPermission() {
        if (Platform.OS !== "android") {
            return Promise.resolve(true);
        }
        const rationale = {
            title: "Microphone Permission",
            message:
                "AudioExample needs access to your microphone so you can record audio."
        };
        return PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            rationale
        ).then(result => {
            console.log("Permission result:", result);
            return result === true || result === PermissionsAndroid.RESULTS.GRANTED;
        });
    }
    onSend(messages = []) {
        messages[0].messageType = "message";
        this.chatsFromFB.update({
            messages: [messages[0], ...this.state.messages]
        });
    }
    renderName = props => {
     
        const { user: self } = this.props; // where your user data is stored;
        //   const { user: self } ={
        //      _id: this.props._id,
        //    name:this.props.name,
        //    firstName:this.props.firstName,
        //    lastName:this.props.lastName,
        //    roomName:this.props.roomName,
        //    avatar:this.props.avatar
  
        // }
        const { user = {} } = props.currentMessage;
        const { user: pUser = {} } = props.previousMessage;
        const isSameUser = pUser._id === user._id;
        const isSelf = user._id === self._Id;
        const shouldNotRenderName = isSameUser;
        let firstName = user.name.split(" ")[0];
        let lastName = user.name.split(" ")[1][0];
        return shouldNotRenderName ? (
            <View />
        ) : (
                <View>
                    <Text style={{ color: "grey", padding: 2, alignSelf: "center" }}>
                        {`${firstName} ${lastName}.`}
                    </Text>
                </View>
            );
    };
    renderAudio = props => {
        return !props.currentMessage.audio ? (
            <View />
        ) : (
                <Ionicons
                    name="ios-play"
                    size={35}
                    color={this.state.playAudio ? "red" : "blue"}
                    style={{
                        left: 90,
                        position: "relative",
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 0.5,
                        backgroundColor: "transparent"
                    }}
                    onPress={() => {
                        this.setState({
                            playAudio: true
                        });
                        const sound = new Sound(props.currentMessage.audio, "", error => {
                            if (error) {
                                console.log("failed to load the sound", error);
                            }
                            this.setState({ playAudio: false });
                            sound.play(success => {
                                console.log(success, "success play");
                                if (!success) {
                                    Alert.alert("There was an error playing this audio");
                                }
                            });
                        });
                    }}
                />
            );
    };
    renderBubble = props => {
        return (
            <View>
                {this.renderName(props)}
                {/* {this.renderAudio(props)} */}
                {/* {this.audioRender(props)} */}
                <Bubble
                textProps={{ style: { color: props.position === 'left' ? '#000' : '#fff',} }}
                 {...props} />
            </View>
        );
    };
    handleAvatarPress = props => {
        // add navigation to user's profile
    };
    handleAudio = async () => {
        const { user } = this.props;
        //    const {user} ={
        //      _id: this.props._id,
        //    name:this.props.name,
        //    firstName:this.props.firstName,
        //    lastName:this.props.lastName,
        //    roomName:this.props.roomName,
        //    avatar:this.props.avatar
  
        // }
        if (!this.state.startAudio) {
            this.setState({
                startAudio: true
            });
            await AudioRecorder.startRecording();
        } else {
            this.setState({ startAudio: false });
            await AudioRecorder.stopRecording();
            const { audioPath } = this.state;
            const fileName = `${this.messageIdGenerator()}.aac`;
            const file = {
                uri: Platform.OS === "ios" ? audioPath : `file://${audioPath}`,
                name: fileName,
                type: `audio/aac`
            };
       
            
            storage()
            .ref("recordings/"+fileName)
            .putFile(file.uri).then(() =>{
                storage().ref('recordings').child(fileName).getDownloadURL().then(url => {
                   
                  
                    const message = {};
                    message._id = this.messageIdGenerator();
                    message.createdAt = Date.now();
                    message.user = {
                        _id: user._id,
                        name: user.name,
                        avatar: user.avatar,
                    };
                      
                    message.text = "";
                    message.audio = url;
                    message.messageType = "audio";

                    this.chatsFromFB.update({
                        messages: [message, ...this.state.messages]
                    });
                })

            }).catch(err => {
                    console.log(err, "err from audio upload");
                });
        }
    };
    messageIdGenerator() {
        // generates uuid.
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
            let r = (Math.random() * 16) | 0,
                v = c == "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }
    sendChatToDB(data) {
        // send your chat to your db
    }
    handleAddPicture = () => {
        const { user } = this.props; // wherever you user data is stored;
    
        // const options = {
        //     title: "Select Profile Pic",
        //     mediaType: "photo",
        //     takePhotoButtonTitle: "Take a Photo",
        //     maxWidth: 256,
        //     maxHeight: 256,
        //     allowsEditing: true,
        //     noData: true
        // };
           let options = {
                title: 'Select Image',
                
                storageOptions: {
                    skipBackup: true,
                    path: 'images',
                },
                };
        ImagePicker.showImagePicker(options, response => {
            if (response.didCancel) {
                // do nothing
            } else if (response.error) {
                // alert error
            } else {
                const { uri } = response;
                const extensionIndex = uri.lastIndexOf(".");
                const extension = uri.slice(extensionIndex + 1);
                const allowedExtensions = ["jpg", "jpeg", "png"];
                const correspondingMime = ["image/jpeg", "image/jpeg", "image/png"];
            
                const file = {
                    uri:response.uri,
                    name: `${this.messageIdGenerator()}.${extension}`,
                };
                  storage()
                 .ref("images/"+file.name)
                 .putFile(file.uri).then(() =>{

                         storage().ref('images').child(file.name).getDownloadURL().then(url => {
                      
                        const message = {};
                        message._id = this.messageIdGenerator();
                        message.createdAt = Date.now();
                        message.user = {
                            _id:user._id,
                            name: user.name,
                            avatar: user.avatar
                        };
                        
                        message.image = url;
                        message.messageType = "image";

                        this.chatsFromFB.update({
                            messages: [message, ...this.state.messages]
                        });
                    });
                 })
               
           
            }
        });
    };
    renderAndroidMicrophone() {
        if (Platform.OS === "android") {
            return (
                <Ionicons
                    name="ios-mic"
                    size={35}
                    hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
                    color={this.state.startAudio ? "red" : "black"}
                    style={{
                        bottom: 50,
                        right: Dimensions.get("window").width / 2,
                        position: "absolute",
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 0.5,
                        zIndex: 2,
                        backgroundColor: "transparent"
                    }}
                    onPress={this.handleAudio}
                />
            );
        }
    }
    renderLoading() {
        if (!this.state.messages.length && !this.state.fetchChats) {
            return (
                <View style={{ marginTop: 100 }}>
                    <ActivityIndicator color="black" animating size="large" />
                </View>
            );
        }
    }
    
     audioRender= props => {
     return !props.currentMessage.audio ? (
            <View />
        ) : (
                <Ionicons
                    name="ios-play"
                    size={35}
                    color={this.state.playAudio ? "red" : "blue"}
                    style={{
                        left: 20,
                        bottom:0,
                        position: "relative",
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 0.5,
                        backgroundColor: "transparent"
                    }}
                    onPress={() => {
                        this.setState({
                            playAudio: true
                        });
                        const sound = new Sound(props.currentMessage.audio, "", error => {
                            if (error) {
                                console.log("failed to load the sound", error);
                            }
                            this.setState({ playAudio: false });
                            sound.play(success => {
                                console.log(success, "success play");
                                if (!success) {
                                    Alert.alert("There was an error playing this audio");
                                }
                            });
                        });
                    }}
                />
            );
   };
   onBackPress = () => {
       const {navigation}=this.props;
       navigation.navigate('MainScreen')

   }

    render() {
        const { user } = this.props; // wherever you user info is
        
        console.log('chat render', user)
        const rightButtonConfig = {
            title: 'Add photo',
            handler: () => this.handleAddPicture(),
        };
        return (
            <View style={{ flex: 1 }}>
                {/* <NavigationBar
                    title={{ title: "chat" }}
                    rightButton={rightButtonConfig}
                /> */}
                 <Appbar.Header statusBarHeight={40}>
                <Appbar.Action icon="keyboard-backspace" onPress={() => {this.onBackPress()}} />
                <Image
                    source={{
                        uri:
                        this.props.recieverAvatar
                    }}
                    style={styles.avatar}
                />
                <Appbar.Content
                    title={this.props.recieverName}
                    titleStyle={[
                        styles.titleStyle,
                        {
                           
                        }
                    ]}
                   
                />
                <Appbar.Action icon="mic" onPress={() => {this.handleAudio()}} />
                <Appbar.Action icon="image" onPress={() => {this.handleAddPicture()}} />
                
            </Appbar.Header>
                {this.renderLoading()}
                {/* {this.state.startAudio &&
                 <ActivityIndicator color="black" animating size="large" />
                } */}
                      <ConfirmDialog
                            title="Recording"
                            message="Press STOP to finish "
                            visible={this.state.startAudio}
                            onTouchOutside={() => setAlert(false)}
                            positiveButton={{
                                title: "STOP",
                                onPress: () =>{ 
                                   this.handleAudio();
                                   
                                }
                            }}
                            
                        />
                {/* {this.renderAndroidMicrophone()} */}
                <GiftedChat
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    alwaysShowSend
                    showUserAvatar
                    isAnimated
                    renderMessageAudio={this.audioRender}
                    showAvatarForEveryMessage
                    renderBubble={this.renderBubble}
                    messageIdGenerator={this.messageIdGenerator}
                    onPressAvatar={this.handleAvatarPress}
                    renderActions={() => {
                        if (Platform.OS === "ios") {
                            return (
                                <Ionicons
                                    name="ios-mic"
                                    size={35}
                                    hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
                                    color={this.state.startAudio ? "red" : "black"}
                                    style={{
                                        bottom: 50,
                                        right: Dimensions.get("window").width / 2,
                                        position: "absolute",
                                        shadowColor: "#000",
                                        shadowOffset: { width: 0, height: 0 },
                                        shadowOpacity: 0.5,
                                        zIndex: 2,
                                        backgroundColor: "transparent"
                                    }}
                                    onPress={this.handleAudio}
                                />
                            );
                        }
                    }}
                    user={{
                        _id: user._id,
                        name: `${user.firstName} ${user.lastName}`,
                        avatar: user.avatar
                    }}
                />
                <KeyboardAvoidingView />
            </View>
        );
    }
}

function mapStateToProps(state) {
  return {
           user:{
                _id: state.chatRoomReducer._id,
                name:state.chatRoomReducer.name,
                firstName:state.chatRoomReducer.firstName,
                lastName:state.chatRoomReducer.lastName,
                roomName:state.chatRoomReducer.roomName,
                avatar:state.chatRoomReducer.avatar,
                 recieverName:state.chatRoomReducer.recieverName,
                recieverAvatar:state.chatRoomReducer.recieverAvatar
           },
           _id: state.chatRoomReducer._id,
           name:state.chatRoomReducer.name,
           firstName:state.chatRoomReducer.firstName,
           lastName:state.chatRoomReducer.lastName,
           roomName:state.chatRoomReducer.roomName,
           avatar:state.chatRoomReducer.avatar,
           recieverName:state.chatRoomReducer.recieverName,
           recieverAvatar:state.chatRoomReducer.recieverAvatar
  }
  
}

export default connect(mapStateToProps,null)(ChatScreen)
