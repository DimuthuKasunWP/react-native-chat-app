import React, { Component } from 'react';
import { FlatList } from 'react-native';
import GroupsItem from './GroupItem';
import styles from './styles';
import storage from '@react-native-firebase/storage';
import { firebaseDB } from "src/firebase";
import auth from "@react-native-firebase/auth";

const data = [
    
];

export default class GroupsList extends Component {

    constructor(props) {
        super(props);
             var groupCollection=[];
        var groupDoc={}
      var user= auth().currentUser;
        console.log("email"+user.email);
        const userName=user.email.toString().substring(0,user.email.indexOf('@'));
         this.groupDocRef = firebaseDB.ref("/groups");
         groupCollection=[];
         var isDuplicate =false;
        firebaseDB.ref("groups").on("value", querySnapShot  => {
                querySnapShot.forEach(function(data) {
                    
                        var i=0;
                        groupDoc={
                            key:data.key,
                           

                        }
                        groupCollection.push(groupDoc);
                        if(groupCollection.length>0){
                            for(i=0;i<groupCollection.length-1;i++){
                                console.log("collection keys"+groupCollection[i].key);
                            if(data.key===(groupCollection[i].key)){
                                groupCollection.pop();
                                console.log("Duplicate key"+data.key);
                                    isDuplicate=true;
                            }
                        }
                        }
                       
                        
                     groupDoc={
                        key:data.key,

                    }
                    console.log("keys"+data.key);
                    // if(!isDuplicate)
                    // groupCollection.push(groupDoc);
                    isDuplicate=false;
                    // console.log("The " + groupCollection[0].key + " user's name  values" + data.val().email);

                    
                
                });
                //  console.log("users collection length: " + querySnapShot.val().map((user)=>{console.log(user.name)}))
            
                 if(groupCollection.length>0){
                   this.setState({groups:groupCollection})
               }

        })
    }
    componentwillMount(){
           var groupCollection=[];
        var groupDoc={}
      var user= auth().currentUser;
        console.log("email"+user.email);
        const userName=user.email.toString().substring(0,user.email.indexOf('@'));
         this.groupDocRef = firebaseDB.ref("/groups");
         groupCollection=[];
         var isDuplicate =false;
        firebaseDB.ref("groups").on("value", querySnapShot  => {
                querySnapShot.forEach(function(data) {
                    
                        var i=0;
                        groupDoc={
                            key:data.key,
                           

                        }
                        groupCollection.push(groupDoc);
                        if(groupCollection.length>0){
                            for(i=0;i<groupCollection.length-1;i++){
                                console.log("collection keys"+groupCollection[i].key);
                            if(data.key===(groupCollection[i].key)){
                                groupCollection.pop();
                                console.log("Duplicate key"+data.key);
                                    isDuplicate=true;
                            }
                        }
                        }
                       
                        
                     groupDoc={
                        key:data.key,

                    }
                    console.log("keys"+data.key);
                    // if(!isDuplicate)
                    // groupCollection.push(groupDoc);
                    isDuplicate=false;
                    // console.log("The " + groupCollection[0].key + " user's name  values" + data.val().email);

                    
                
                });
                //  console.log("users collection length: " + querySnapShot.val().map((user)=>{console.log(user.name)}))
            
                 if(groupCollection.length>0){
                   this.setState({groups:groupCollection})
               }

        })
    }

     state={

        groups:[]
    }
    renderItem = ({ item }) => {
        return <GroupsItem  navigation={this.props.navigation} item={item} />;
    };

    render() {
        return (
            <FlatList
                data={this.state.groups}
                contentContainerStyle={styles.list}
                renderItem={this.renderItem}
                showsVerticalScrollIndicator={false}
            />
        );
    }
}
