import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import GroupsList from 'src/components/GroupsList';
import styles from './styles';
import { Dialog } from 'react-native-simple-dialogs';
import TextInput from 'src/components/TextInput';
import auth from "@react-native-firebase/auth";
import {connect} from 'react-redux';
import { firebaseDB } from "src/firebase";
import {setupRoom} from 'src/actions/chatRoomActions';

export default class GroupsScreen extends Component {

    state={
        dialogVisible:false, 
        groupName:''

    }
    _onLoginPressed=()=>{
        var currentUser= auth().currentUser;
        this.state.email=currentUser.email;
        const currentUserName=currentUser.email.toString().substring(0,this.state.email.indexOf('@'));
       
        this.userDocRef = firebaseDB.ref("users/"+currentUserName);
        this.userDocRef.on("value", snapshot => {
               const userDoc= snapshot.val();
               this.setState({
                   name:userDoc.name,
                   image:userDoc.image
               })
               this.state.name=userDoc.name;
               this.state.image=userDoc.image
               console.log("userDOc"+this.state.image);

               const { name,email,key, image,navigation } = this.props.item;
             console.log("current user nameddd value"+currentUserName)
            var array=[currentUserName.toString(),key.toString()];
            var roomName =array.sort();
            console.log("room name"+roomName);
            var part1 = roomName.toString().substring(0, roomName.toString().indexOf('@'));
            console.log("this is part 1"+part1);
            var part2 = roomName.toString().substring(roomName.toString().indexOf('@') + 1, roomName.toString().length);
            var firstName=name.split(" ")[0];
            if(name.split(" ")[1])
            var lastName=name.split(" ")[1][0]
            else
            var lastName=" "
             const user = {
            _id: `${firstName}${lastName}`,
            name: `${firstName}${lastName}`,
            firstName: firstName,
            lastName: lastName,
            roomName:  `${part1}${part2}`,
            avatar: image
        }
        this.props.setupRoom(user);
       
        this.props.navigation.navigate('ChatScreen',user);
               

        })

    }

    render() {
        return (
            <View style={styles.container}>
            <Dialog
                visible={this.state.dialogVisible}
                title="Enter Group Name :"
                onTouchOutside={() => this.setState({dialogVisible: false})} >
                <View>
                     <TextInput
                        label="Group Name"
                        returnKeyType="next"
                        value={this.state.groupName}
                        onChangeText={(text) =>{
                            this.setState({
                                groupName: text
                            })
                            this.state.groupName=text;

                        }  }
                        autoCapitalize="none"
                        textContentType="groupname"
                        keyboardType="groupname"
                />
                  <Button style={{marginBottom:"10%",marginTop:"10%"}} mode="contained" onPress={this._onLoginPressed}>
                        Create Group
                    </Button>
                </View>

            </Dialog>
                  <Button
                    icon="group"
                    mode="contained"
                    onPress={() => {
                        this.setState({
                            dialogVisible:true
                        })
                        this.state.dialogVisible =true;
                        // this.props.navigation.navigate('EnterRoomScreen')
                        }}
                >
                   Create Group
                </Button>
                <GroupsList />
            </View>
        );
    }
}
