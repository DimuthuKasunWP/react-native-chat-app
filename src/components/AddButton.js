import React, { Component } from 'react'
import {imageIsAdded} from '../actions/cameraActions'
import {TouchableOpacity, StyleSheet} from 'react-native'
import {Button, Icon} from 'react-native-elements'
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux'

class AddButton extends Component {

  chooseImage = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
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

        console.log('response', JSON.stringify(response));
        const values ={
            data:response.data,
            uri:response.uri
        }
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
      
      </TouchableOpacity>
    )
  }
}

function mapDispatchToProps(dispatch, ownProps) { 
  return {
    imageAdded: data => {dispatch(imageIsAdded(data))}
  }
  
}
const styles = StyleSheet.create({
  btn: {
     width: 225,
    height: 50,
    backgroundColor: '#DCDCDC',
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