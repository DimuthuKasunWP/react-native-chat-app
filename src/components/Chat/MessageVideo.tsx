import React from 'react'
import Color from './Color'
import { View, Text } from 'react-native'

export default (_props: any) => (
  <View style={{ padding: 20 }}>
    <Text style={{ color: Color.alizarin, fontWeight: '600' }}>
      Video is not implemented by Chat.
    </Text>
    <Text style={{ color: Color.alizarin, fontWeight: '600' }}>
      You need to provide your own implementation by using renderMessageVideo
      prop.
    </Text>
  </View>
)
