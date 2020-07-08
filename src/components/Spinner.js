import React from 'react'
import {StyleSheet, View} from 'react-native'
import { Container, Content, Spinner } from 'react-native-elements';


const SpinnerComp = () => {

    return (
      <View style={styles.container}>
        <View style={styles.spinnerHolder}>
          <Spinner color='blue'/>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  spinnerHolder:{
    width: 85,
    height: 85,
    borderRadius: 5,
    backgroundColor: '#d0d4d7'
  }
})

export default SpinnerComp