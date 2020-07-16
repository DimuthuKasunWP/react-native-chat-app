import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { TouchableRipple, Text } from 'react-native-paper';
import _ from 'lodash';
import Avatar from '../Avatar';
import Images from 'src/config/images';
import styles from './styles';
import PropTypes from 'prop-types';
import auth from "@react-native-firebase/auth";
import {connect} from 'react-redux';
import { firebaseDB } from "src/firebase";
import {setupRoom} from 'src/actions/chatRoomActions';

 class UserItem extends Component {
    shouldComponentUpdate(nextProps) {
        if (_.isEqual(this.props.item, nextProps.item)) {
            return false;
        }
        return true;
    }
    state ={

        name:'',
        image:''
    }

    onPress = () => {
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
            var firstName=this.state.name.split(" ")[0];
            if(name.split(" ")[1])
            var lastName=this.state.name.split(" ")[1][0]
            else
            var lastName="ucsc "
             const user = {
            _id: `${firstName}${lastName}`,
            name: `${firstName}${lastName}`,
            firstName: firstName,
            lastName: lastName,
            roomName:  `${part1}${part2}`,
            avatar: this.state.image,
            recieverName:name,
            recieverAvatar:image
        }
        this.props.setupRoom(user);
       
        this.props.navigation.navigate('ChatScreen',user);
               

        })
         
    };

    render() {
        const { name,email,key, image } = this.props.item;
        return (
            <TouchableRipple
                onPress={this.onPress}
                rippleColor="rgba(0, 0, 0, .20)"
            >
                <View style={styles.item}>
                    <Avatar uri={image} enableDot />
                    <Text style={styles.userName}>
                        {"  "+name[0].toUpperCase() +
                            name.slice(1) 
                           }
                    </Text>
                    {/* <Image style={styles.wave} source={Images.profile.wave} /> */}
                </View>
            </TouchableRipple>
        );
    }
}

UserItem.propTypes = {
    item: PropTypes.object
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setupRoom: (values) => {dispatch(setupRoom(values))}
  }
}
export default connect(null,mapDispatchToProps)(UserItem)