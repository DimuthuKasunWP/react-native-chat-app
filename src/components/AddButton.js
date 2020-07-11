import React, { Component } from 'react'
import {imageIsAdded,successfullyUploaded} from '../actions/cameraActions'
import {TouchableOpacity, StyleSheet} from 'react-native'
import {Button, Icon, Text} from 'react-native-elements'
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux'
import { ProgressDialog,ConfirmDialog } from 'react-native-simple-dialogs';
import storage from '@react-native-firebase/storage';



class AddButton extends Component {
  constructor(props) {
    super(props);
    this.state={
          isLoading:false,
          filePath: '',
          fileData: '',
          fileUri:'', 
          downloadURI:'', 
          isUploaded:false
    }
  }

   uploadImage =  (Uri,Data) => {
    console.log('uri'+Uri);
        this.setState({
          isLoading:true
        })
        this.props.uploaded({isLoading:true})
        const filename = Uri.substring(Uri.lastIndexOf('/') + 1);
        this.state.fileUri = Platform.OS === 'ios' ? uri.replace('file://', '') : Uri;
        const task = storage()
          .ref("images/"+filename)
          .putFile(this.state.fileUri).then((snapshot) => {
      
              console.log("uploaded");
              this.setState({
                isLoading:false,
                isUploaded:true
              })
              var dta='';
                 storage().ref('images').child(filename).getDownloadURL().then(function(url) {
                    dta=url;
                    console.log('File available at', dta);
                  })
              const val={

                isLoading:false,
                data:Data,
                 uri:Uri,
                 uploaded:true

              }
              this.props.uploaded(val);
        
          }).catch(err => {

            console.log(err)
          })
          

      
       
       
      }


  chooseImage = () => {
    let options = {
      title: 'Select Image',
    
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        const values ={
            data:response.data,
            uri:response.uri,
            
        }
         this.uploadImage(response.uri,response.data);
        this.props.imageAdded(values);
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri
        });
       
      }
    });
  }

  render() {
    return (
     

      <TouchableOpacity onPress={this.chooseImage} style={styles.btn}>
      {this.state.isUploaded===false &&
      <Text style={{ontWeight: "bold",fontSize:20}} > Upload  </Text>
  }
     {this.state.isUploaded===true &&
      <Text  style={{ontWeight: "bold",fontSize:20}} > Send  </Text>
      
  }
      </TouchableOpacity>
    )
  }
}

function mapDispatchToProps(dispatch, ownProps) { 
  return {
    imageAdded: data => {dispatch(imageIsAdded(data))},
    uploaded: data => {dispatch(successfullyUploaded(data))}
  }
  
}
const styles = StyleSheet.create({
  btn: {
     width: 225,
    height: 50,
    backgroundColor: '#4264F7',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom:10
  },
  button: {
    borderRadius: 55,
    backgroundColor: '#046ebc',

  },
  add: {
    fontWeight: 'bold',
    color: 'white'
  }
})

export default connect(null,mapDispatchToProps)(AddButton)