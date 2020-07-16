import React, { Component } from 'react';
import { FlatList } from 'react-native';
import UserItem from './UserItem';
import storage from '@react-native-firebase/storage';
import { firebaseDB } from "src/firebase";
import auth from "@react-native-firebase/auth";

export default class MessageList extends Component {
    constructor(props){
        super(props);
        var userCollection=[];
        var userDoc={}
      var user= auth().currentUser;
        this.state.email=user.email;
        console.log("email"+user.email);
        const userName=user.email.toString().substring(0,this.state.email.indexOf('@'));
         this.userDocRef = firebaseDB.ref("/users");
        firebaseDB.ref("users").on("value", querySnapShot  => {
                querySnapShot.forEach(function(data) {
                     if(data.key===userName) {


                    }else{
                     userDoc={
                        key:data.key,
                        name:data.val().name,
                        email:data.val().email,
                        image:data.val().image

                    }
                    userCollection.push(userDoc);
                    console.log("The " + userCollection[0].key + " user's name  values" + data.val().email);

                    }
                
                });
                //  console.log("users collection length: " + querySnapShot.val().map((user)=>{console.log(user.name)}))
               if(userCollection.length>0){
                   this.setState({users:userCollection})
                   console.log("fist usersssss name"+this.state.users[0].name);
               }
              

        })

    }
    state={

        users:[]
    }

    componentWillUnmount() {
        var userCollection=[];
        var userDoc={}
      var user= auth().currentUser;
        this.state.email=user.email;
        console.log("email"+user.email);
        const userName=user.email.toString().substring(0,this.state.email.indexOf('@'));
         this.userDocRef = firebaseDB.ref("/users");
        firebaseDB.ref("users").on("value", querySnapShot  => {
                querySnapShot.forEach(function(data) {
                    console.log("data key"+data.key);
                    console.log("username value"+userName);
                    if(data.key===userName) {


                    }else{
                        userDoc={
                            key:data.key,
                            name:data.val().name,
                            email:data.val().email,
                            image:data.val().image,
                            navigation:this.props.navigation

                         }
                    userCollection.push(userDoc);
                    console.log("The " + userCollection[0].key + " user's name  values" + data.val().email);
                    }
                   
                });
                //  console.log("users collection length: " + querySnapShot.val().map((user)=>{console.log(user.name)}))
               if(userCollection.length>0){
                   this.setState({users:userCollection})
                   console.log("fist users name"+userCollection[0].name);
               }
              

        })

    }
  

    renderItem = ({ item }) => {
        return <UserItem navigation={this.props.navigation} item={item}  />;
    };

    render() {
        return (
            <FlatList
                data={this.state.users}
                renderItem={this.renderItem}
                keyExtractor={item => item.key}
            />
        );
    }
}
