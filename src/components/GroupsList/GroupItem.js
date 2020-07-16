import React, { Component } from 'react';
import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';

import Avatar from '../Avatar';
import styles from './styles';
import PropTypes from 'prop-types';
import auth from "@react-native-firebase/auth";
import {connect} from 'react-redux';
import { firebaseDB } from "src/firebase";
import {setupRoom} from 'src/actions/chatRoomActions';

 class GroupItem extends Component {
     state={
         name:'',
         image:'',
         email:''

     }
    onPress = () => {
       
         const { key } = this.props.item;
         const{navigation} = this.props;
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
            _id: currentUserName,
            name: `${firstName}${lastName}`,
            firstName: firstName,
            lastName: lastName,
            roomName:  key,
            avatar: this.state.image,
            recieverName:key,
            recieverAvatar: "https://firebasestorage.googleapis.com/v0/b/chat-app-71bd1.appspot.com/o/images%2Fgroup1.png?alt=media&token=229b182b-6eea-42d8-bc3a-7739de73d049"
        }
        this.props.setupRoom(user);
        this.state.dialogVisible=false;
        this.setState({
            dialogVisible:false
        })
        this.props.navigation.navigate('ChatScreen',user);
               

        })

    
    };
    render() {
        const { key } = this.props.item;
        return (
            <Card style={styles.card} onPress={this.onPress}>
                <View style={styles.cardView}>
                    <View style={styles.nameView}>
                        <Avatar large isGroup />
                        <Text style={styles.nameText}>{key}</Text>
                        {/* <Text style={styles.last}>
                            Active {item.last_active}
                        </Text> */}
                    </View>
                    {/* <View style={styles.footer}>
                        <Text numberOflines={2} style={styles.members}>
                            {item.members}
                        </Text>
                    </View> */}
                </View>
            </Card>
        );
    }
}

GroupItem.propTypes = {
    item: PropTypes.object
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setupRoom: (values) => {dispatch(setupRoom(values))}
  }
}
export default connect(null,mapDispatchToProps)(GroupItem)