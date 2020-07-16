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


class GroupsScreen extends Component {

    state={
        dialogVisible:false, 
        groupName:'',
        name:'',
        image:''

    }
    _onCreateGroupPressed=()=>{
     firebaseDB.ref('/groups/'+this.state.groupName).set({
         name:this.state.groupName,

     }).then(()=>{
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

         var firstName=this.state.name.toString().substring(0, this.state.name.toString().indexOf(' '));
            var lastName='';
            if(this.state.name.toString().substring( this.state.name.toString().indexOf(' '),this.state.name.toString().length).length>0){
                lastName=this.state.name.split(" ")[1][0];
            }else{
                lastName="u";
            }
             const user = {
            _id: currentUserName ,
            name: `${firstName}${lastName}`,
            firstName: firstName,
            lastName: lastName,
            roomName:  this.state.groupName,
            avatar: this.state.image,
            recieverName:this.state.groupName,
            recieverAvatar: "https://firebasestorage.googleapis.com/v0/b/chat-app-71bd1.appspot.com/o/images%2Fgroup1.png?alt=media&token=229b182b-6eea-42d8-bc3a-7739de73d049"
        }
        this.props.setupRoom(user);
        this.state.dialogVisible=false;
        this.setState({
            dialogVisible:false
        })
        this.props.navigation.navigate('ChatScreen',user);
               

        })

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
                  <Button style={{marginBottom:"10%",marginTop:"10%"}} mode="contained" onPress={this._onCreateGroupPressed}>
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
                <GroupsList  navigation={this.props.navigation} />
            </View>
        );
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setupRoom: (values) => {dispatch(setupRoom(values))}
  }
}
export default connect(null,mapDispatchToProps)(GroupsScreen)