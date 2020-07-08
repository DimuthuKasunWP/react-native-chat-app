import React, { Component } from 'react'
import {TouchableOpacity, StyleSheet, View, } from 'react-native'
import {Text, Input, Button, Item} from 'react-native-elements'
import Modal from 'react-native-modal'

class ModalItem extends Component {

  state={
    name: ''
  }

  componentDidMount(){
    this.setState({
      name: this.props.imageName
    })
  }
  
  onChangeTextHandler=(val)=>{
    this.setState({
      name: val
    })
  }
  
  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        isVisible={this.props.modal}>
        <View style={styles.modal}>
          <View style={styles.modalConts}>
            <Text style={styles.modalHead}>Image Title</Text>
            <Item regular style={styles.input}>
              <Input 
                value={this.state.name}
                onChangeText={this.onChangeTextHandler}/>
            </Item>
            <TouchableOpacity style={styles.modalBtnOuter}>
              <Button 
                small 
                primary 
                onPress={()=>this.props.modalHandler(
                  this.props.imageId, this.state.name, true
                  )} 
                style={styles.modalBtn}>
                <Text style={styles.textBtn}>Change Title</Text>
              </Button>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
   modal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 240,
    width: '100%',
  },
  modalConts: {
    width: 290,
    height: 125,
    borderRadius: 15,
    backgroundColor: '#e8edf0',
  },
  modalHead: {
    textAlign: 'center',
    color: '#046ebc',
    height: 30,
    paddingTop: 8
  },
  input: {
    height: 43,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#d5dbdf'
  },
  modalBtnOuter: {
    position: 'absolute',
    bottom: 8,
    width: '100%'
  },
  modalBtn: {
    alignItems: 'center',
    backgroundColor: '#046ebc',
    marginLeft: 92,
    borderRadius: 5,
  },
  textBtn: {
    textTransform: 'capitalize',
  }
})
export default ModalItem