import React, { Component } from 'react'
import { Card, Icon,Button } from 'react-native-elements'
import ImagePicker from 'react-native-image-picker'
import auth from "@react-native-firebase/auth";
import { firebaseDB } from "src/firebase";
import { ProgressDialog,ConfirmDialog } from 'react-native-simple-dialogs';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import {
  Image,
  ImageBackground,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import BackButton from 'src/components/BackButton';
import TextInput from 'src/components/TextInput';
import PropTypes from 'prop-types'
import ListView from 'deprecated-react-native-listview';

import mainColor from 'src/components/profile/constants'

import Email from 'src/components/profile/Email'
import Separator from 'src/components/profile/Separator'
import Tel from 'src/components/profile/Tel'

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
  },
  emailContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 35,
  },
  headerContainer: {
    marginTop: 30,

  },
  headerColumn: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        alignItems: 'center',
        elevation: 1,
        marginTop: -1,
      },
      android: {
        alignItems: 'center',
      },
    }),
  },
  placeIcon: {
    color: 'white',
    fontSize: 26,
    marginRight:10
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  telContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  userAddressRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  userCityRow: {
    backgroundColor: 'transparent',
  },
  userCityText: {
    color: '#A5A5A5',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  userImage: {
    borderColor: mainColor,
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
  userNameText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 8,
    textAlign: 'center',
  },
})

class Profile extends Component {
  static propTypes = {
    avatar: PropTypes.string.isRequired,
    avatarBackground: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.shape({
      city: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
    }).isRequired,
    emails: PropTypes.arrayOf(
      PropTypes.shape({
        email: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
    tels: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ).isRequired,
  }

  state ={

    isUploading:false, 
    isUploaded:false,
    email:'', 
    name:'',
    image:null,
    isSubmitted:false,
    newName:'',
    url:''
  }
  constructor(props) {
    super(props);
        var user= auth().currentUser;
        this.state.email=user.email;
        console.log("email"+user.email);
        const userName=user.email.toString().substring(0,this.state.email.indexOf('@'));
         this.userDocRef = firebaseDB.ref("users/"+userName);
        this.userDocRef.on("value", snapshot => {
               const userDoc= snapshot.val();
                this.state.name=userDoc.name;
                if(userDoc.image)
                this.state.image=userDoc.image;
               console.log("userDOc"+this.state.name);

        })

  }

  componentWillMount(){
           var user= auth().currentUser;
        this.state.email=user.email;
        console.log("email"+user.email);
        const userName=user.email.toString().substring(0,this.state.email.indexOf('@'));
         this.userDocRef = firebaseDB.ref("users/"+userName);
        this.userDocRef.on("value", snapshot => {
               const userDoc= snapshot.val();
                this.state.name=userDoc.name;
                if(userDoc.image)
                this.state.image=userDoc.image;
               console.log("userDOc"+this.state.name);

        })

  }




  onPressPlace = () => {
    console.log('place')
  }

  onPressTel = number => {
    Linking.openURL(`tel://${number}`).catch(err => console.log('Error:', err))
  }

  onPressSms = () => {
    console.log('sms')
  }

  onPressEmail = email => {
    Linking.openURL(`mailto://${email}?subject=subject&body=body`).catch(err =>
      console.log('Error:', err)
    )
  }

  renderHeader = () => {
       const {navigation} =this.props;
    

    return (
      <View style={styles.headerContainer}>
         {/* <BackButton  goBack={() => navigation.navigate('MainScreen')} /> */}
      
        <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={10}
          source={{
            uri: "https://orig00.deviantart.net/dcd7/f/2014/027/2/0/mountain_background_by_pukahuna-d73zlo5.png",
          }}
        >
         
          <View style={styles.headerColumn}>
         {/* <BackButton style={{marginLeft:100}} goBack={() => navigation.navigate('MainScreen')} /> */}
          {this.state.image ? ( 
          <Image
              style={styles.userImage}
              source={{
               uri: this.state.image ,
              }}
            />
            ):(
              <Image
              style={styles.userImage}
              source={{
               uri: "https://firebasestorage.googleapis.com/v0/b/chat-app-71bd1.appspot.com/o/images%2Fnotfound.jpg?alt=media&token=29f52e9f-d896-400d-827d-4cee6acd4b3e",
              }}
            />

            )}
           
            <Text style={styles.userNameText}>{this.state.name}</Text>
            <View style={styles.userAddressRow}>
              <View>
                <Icon
                  name="email"
                  underlayColor="transparent"
                  iconStyle={styles.placeIcon}
                  onPress={this.onPressPlace}
                />
              </View>
              <View style={styles.userCityRow}>
                <Text style={styles.userCityText}>
                  {/* {city}, {country} */}
                  {this.state.email}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
        
      </View>
      
    )
  }

  renderTel = () => (
    <ListView
      contentContainerStyle={styles.telContainer}
      dataSource={this.state.telDS}
      renderRow={({ id, name, number }, _, k) => {
        return (
          <Tel
            key={`tel-${id}`}
            index={k}
            name={name}
            number={number}
            onPressSms={this.onPressSms}
            onPressTel={this.onPressTel}
          />
        )
      }}
    />
  )

  renderEmail = () => (
    <ListView
      contentContainerStyle={styles.emailContainer}
      dataSource={this.state.emailDS}
      renderRow={({ email, id, name }, _, k) => {
        return (
          <Email
            key={`email-${id}`}
            index={k}
            name={name}
            email={email}
            onPressEmail={this.onPressEmail}
          />
        )
      }}
    />
  )
 renderUploadButton=()=>{
     let button=[];
        if(this.state.isUploading==true){
            button=   ( 
            <Button
                    
                    title="Uploading"
                    loading
                     type="clear"
                    />);
        }else if(this.state.isUploaded==true){
         button=   (<Button
            icon={{
                name: "arrow-right",
                size: 15,
                color: "white"
            }}
             type="clear"
            title="image Uploaded"
            />);
        }else{
           button=   (<Button
           onPress={this.handleAddPicture}
             type="clear"
            title="Upload New Image"
            />)
        }
        return button;


     
 }

  handleAddPicture = () => {
        const { user } = this.props; // wherever you user data is stored;
    
           let options = {
                title: 'Select Image',
                
                storageOptions: {
                    skipBackup: true,
                    path: 'images',
                },
                };
        ImagePicker.showImagePicker(options, response => {
          this.state.isUploading=true;
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
                            this.state.url=url;
                      const userName=this.state.email.toString().substring(0,this.state.email.indexOf('@'));
                 this.userDocRef = firebaseDB.ref("users/"+userName);
              //  this.userDocRef.on("value", snapshot => {})
                            firebaseDB.ref('/users/'+userName).update({
                            "email":this.state.email,
                            "name":this.state.newName,
                            "image":url
                            }).then(function(res){
                              this.state.isuploaded = true;
                              this.state.isUploading = false;
                            })
               
                    });
                 })
               
           
            }
        });
    };

    handleSubmit(){
      console.log("this is url"+this.state.url);
    const userName=this.state.email.toString().substring(0,this.state.email.indexOf('@'));
              firebaseDB.ref('/users/'+userName).update({
                            "email":this.state.email,
                            "name":this.state.newName,
                            "image":this.state.url
                            }).then(function(res){
                                this.state.isSubmitted=true;
                            })
    }
    handleDialogButtonClick(){
        this.state.isSubmitted= false;

    }
  render() {
      const {navigation} =this.props;
    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <Card containerStyle={styles.cardContainer}>
           

            {this.renderHeader()}
          </Card>
                      
                    <ConfirmDialog
                  title="Submitted"
                  message="Profile Changed Successfully"
                  visible={this.state.isSubmitted}
                  onTouchOutside={() => {this.state.isSubmitted=false;}}
                  positiveButton={{
                      title: "OK",
                      onPress: () => this.handleDialogButtonClick
                  }}
                  
              />
              <FormLabel>Name</FormLabel>
              <FormInput onChangeText={(text) => {
                    this.state.newName=text
                    console.log(text)this.state.name
              }}/>
        
                {/* <TextInput
                    style={{width:"80%",marginLeft:"10%",marginTop:30}}
                    label="Enter New Name"
                    returnKeyType="next"
                    value={this.state.newName}
                    onChangeText={text => {
                      this.state.newName=text;
                      

                      // this.state.name=this.state.newName
                      console.log("typing"+this.state.newName);
                    }}
                    autoCapitalize="none"
                    autoCompleteType="name"
                    textContentType="Name"
                    keyboardType="name"
                /> */}
                <View style={{width:"40%",marginLeft:"50%", marginBottom:"10%"}}>
                {this.renderUploadButton()}
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{width:"40%",marginLeft:"5%" ,marginRight:"10%"}}>
                 <Button
                 type="clear"
                 onPress={()=>{
                    navigation.navigate("MainScreen");

                 }}
                    icon={
                        <Icon
                        name="arrow-right"
                        size={0}
                        color="white"
                        />
                    }
                    buttonStyle={{color:"green"}}
                    title="Back"
                    />
                </View>
                <View style={{width:"40%"}}>
                <Button
                 type="clear"
                 onPress={() =>{
                    this.handleSubmit();

                 }}
                    icon={
                        <Icon
                        name="arrow-right"
                        size={0}
                        color="white"
                        />
                    }
                    title="Update Profile"
                    />
                </View>
                </View>
                
                
        </View>
      </ScrollView>
    )
  }
}

export default Profile