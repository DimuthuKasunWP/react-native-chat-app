import React, { Component } from 'react'
import {TouchableOpacity, StyleSheet} from 'react-native'
import {Button, Icon} from 'react-native-elements'

class AddButton extends Component {

  render() {
    return (
      <TouchableOpacity style={styles.btn}>
        <Button 
          style={styles.button}
          onPress={()=>this.props.navigation.navigate('Camera')}>
          <Icon name="add" style={styles.add}/>
        </Button>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
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
})

export default AddButton