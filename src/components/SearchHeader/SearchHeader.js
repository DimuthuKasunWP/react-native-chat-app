import React, { Component } from 'react';
import { View, Platform, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import FBStatusBar from 'src/components/FBStatusBar';
import styles from './styles';
import { Avatar } from 'react-native-elements';
import { Appbar, Searchbar } from 'react-native-paper';
import auth from "@react-native-firebase/auth";
import { firebaseDB } from "src/firebase";

export default class SearchHeader extends Component {

    constructor(props) {
        super(props);
                var user= auth().currentUser;
        this.state.email=user.email;
        console.log("email"+user.email);
        const userName=user.email.toString().substring(0,this.state.email.indexOf('@'));
         this.userDocRef = firebaseDB.ref("users/"+userName);
        this.userDocRef.on("value", snapshot => {
               const userDoc= snapshot.val();
               this.setState({
                   name:userDoc.name,
                   image:userDoc.image
               })
               console.log("userDOc"+this.state.image);

        })
        

    }
    state = {
        searchQuery: '',
        isFocused: false,
        email:'', 
        image:null, 
        name:'',
        userDoc:null
    };

    componentWillMount(){
        var user= auth().currentUser;
        this.state.email=user.email;
        const userName=user.email.toString().substring(0,this.state.email.indexOf('@'));
         this.userDocRef = firebaseDB.ref("users/"+userName);
        this.userDocRef.on("value", snapshot => {
               const userDoc= snapshot.val();
               this.setState({
                   name:userDoc.name,
                   image:userDoc.image
               })
               console.log("userDOc"+this.state.image);

        })


    }

    onFocus = () => {
        this.setState(
            {
                isFocused: true
            },
            () => {
                this.props.navigation.navigate('SearchScreen');
                setTimeout(() => {
                    this.searchTextInput.focus();
                }, 240);
            }
        );
    };

    onBlur = () => {
        this.setState({
            isFocused: false
        });
    };

    onPress = () => {
        if (this.state.isFocused) {
            this.setState({
                isFocused: false
            });
            this.props.navigation.pop();
        } else {
            this.onFocus();
        }
    };

    render() {
        const activeScreen = this.props.navigation.state.routes[
            this.props.navigation.state.index
        ].routeName;

        return (
            <View
                style={
                    activeScreen === 'HomeScreen'
                        ? styles.container
                        : styles.elevatedContainer
                }
            >
                <FBStatusBar backgroundColor="black" barStyle="light-content" />
                {this.state.isFocused ? (
                    <Appbar.Header style={styles.toolbar}>
                        <Searchbar
                            ref={input => {
                                this.searchTextInput = input;
                            }}
                            style={styles.searchbar}
                            placeholder="Search"
                            icon={
                                Platform.OS === 'ios'
                                    ? 'keyboard-arrow-left'
                                    : 'arrow-back'
                            }
                            onIconPress={this.onPress}
                            onChangeText={query => {
                                this.setState({ searchQuery: query });
                            }}
                            onFocus={this.onFocus}
                            onBlur={this.onBlur}
                            value={this.state.searchQuery}
                        />
                    </Appbar.Header>
                ) : (
                    <Appbar.Header style={styles.toolbar}>
                        <Appbar.Action icon="search" onPress={this.onPress} />
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={this.onPress}
                        >
                            <Text style={styles.btnText}>Search</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {this.props.navigation.navigate("ProfileScreen")}}>
                      
                       {this.state.image ?(
                             <Avatar
                         size="small"
                         rounded
                           source={{
                                uri:this.state.image
                            }}
                            showEditButton = "true"
                            />
                       ):(
                            <Avatar
                         size="small"
                         rounded
                          source={{
                                uri:"https://firebasestorage.googleapis.com/v0/b/chat-app-71bd1.appspot.com/o/images%2Fnotfound.jpg?alt=media&token=29f52e9f-d896-400d-827d-4cee6acd4b3e"
                            }}
                         
                        showEditButton = "true"
                            />
                       )
                       }
                         
                        {/* <Appbar.Action icon="face" onPress={this._onSearch} /> */}
                        </TouchableOpacity>
                    </Appbar.Header>
                )}
            </View>
        );
    }
}
