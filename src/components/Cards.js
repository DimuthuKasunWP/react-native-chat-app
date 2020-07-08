import React, { Component } from 'react'
import {StyleSheet, TouchableOpacity, Image, View} from 'react-native'
import {Card, CardItem, Left, Button, Text, Right, Icon} from 'react-native-elements'
import {connect} from 'react-redux'

import {deleteImage} from '../actions/cameraActions'
class Cards extends Component {



  render() {

    let cards = this.props.imageCollection.map((image, i) => {
      return (
        <Card key={i}>
          <CardItem cardBody>
            <Image source={{uri: image.url}} style={{height: 200, width: null, flex: 1}} />
          </CardItem>
          <CardItem style={styles.card}>
            <Left>
              <TouchableOpacity>
                <Button transparent
                  onPress={()=>this.props.modalHandler(image.imageId, image.name)} >
                  <Text style={styles.font}>{image.name}</Text>
                </Button>
              </TouchableOpacity>
            </Left>
            <Right>
              <Button 
                transparent 
                onPress={()=>this.props.deleteImg(image.imageId)}>
                <Icon style={{color: 'red', fontSize: 20}}active name="trash" />
              </Button>
            </Right>
          </CardItem>
        </Card>
      )
    })

    return (
      <View>
        {cards}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    height: 32
  },
  font: {
    fontSize: 15,
    textTransform: 'capitalize'
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    imageCollection: state.imageCollection
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    deleteImg: (id) => {dispatch(deleteImage(id))}
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cards)