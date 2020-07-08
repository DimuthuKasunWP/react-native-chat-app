import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import {connect} from 'react-redux'
import {addImage} from '../actions/cameraActions'
import Spinner from '../components/Spinner'

class Camera extends Component {

  static navigationOptions ={
    header: null
  }

  navigateHandler = () => {
    this.props.navigation.push('ImageCollection')
  }
  
  render() {
    if(this.props.imageAdded){ this.navigateHandler() }
    let camera = 
    <View>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',          
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
      
          />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14  }}> SNAP </Text>
          </TouchableOpacity>
        </View>
      </View>

    if(this.props.spinner){
      camera = <Spinner />
    }

    return (
      <View style={styles.container}>
        {camera}
      </View>
    );
  }

  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      this.props.addImage(data)
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

const mapStateToProps = (state, ownProps) => {
  return {
    spinner: state.spinner,
    imageAdded: state.imageIsAdded
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addImage: (data) => {dispatch(addImage(data))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Camera)