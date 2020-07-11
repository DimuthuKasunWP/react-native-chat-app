import AddButton from '../components/AddButton';
import React, { Fragment, Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import {Button  , Icon} from 'react-native-elements'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {connect} from 'react-redux'
import { ConfirmDialog,ProgressDialog } from 'react-native-simple-dialogs';

 class Camera extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filepath: {
        data: '',
        uri: ''
      },
      fileData: '',
      fileUri: '',
      uploaded:false
    }
  }

  

  

  renderFileData() {
    if (this.props.data) {
      return <Image source={{ uri: 'data:image/jpeg;base64,' + this.props.data }}
        style={styles.images}
      />
    } else {
      return <Image source={require('../assets/logo.png')}
        style={styles.images}
      />
    }
  }

  renderFileUri() {
    if (this.props.uri) {
      return <Image
        source={{ uri: this.props.uri }}
        style={styles.images}
      />
    } else {
      return <Image
        source={require('../assets/logo.png')}
        style={styles.images}
      />
    }
  }
 
  render() {
    return (
     
        
          <View style={styles.body}>
            <Text style={{textAlign:'center',fontSize:20,paddingBottom:10}} >Choose Image to send</Text>
            <View style={styles.ImageSections}>
             
              <View style={{width:'100%',textAlign:'center'}}>
                {this.renderFileUri()}
               
              </View>
            </View>
               
            <ProgressDialog
                  visible={this.props.isLoading}
                  title=""
                  message="Please, wait..."
              />
            <View style={styles.btnParentSection}>
             <AddButton />
                       
              
            </View>

          </View>
      
    );
  }
};

function mapStateToProps(state) {
  return {
    uri:state.imageReducer.uri,
    data:state.imageReducer.data,
    isLoading:state.imageReducer.isLoading,
    uploaded:state.imageReducer.uploaded
    
  }
  
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },

  body: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    marginTop:"-20%",
    height: Dimensions.get('screen').height - 20,
    width: Dimensions.get('screen').width
  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
    marginBottom:"-50%"
  },
  images: {
    width: "80%",
    height: "50%",
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3,
    marginLeft:'10%'
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop:10
  },
  btnSection: {
    width: 225,
    height: 50,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom:10
  },
  btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    fontWeight:'bold'
  },
   btn: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  button: {
    borderRadius: 55,
    backgroundColor: '#046ebc',

  },
  add: {
    fontWeight: 'bold',
    color: 'white'
  }
});
export default connect(mapStateToProps,null)(Camera)


