import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import Store from '../screens/Store'

export default DisplayTodo = () => {
  return (
    <View style={{
      backgroundColor: '#004040',
      flex: 1
    }}>
      <Text style={styles.title}>
        {Store.title}
      </Text>
      <Text style={styles.desc}>
        {Store.desc}
      </Text>
    </View>
  )
}

const styles=StyleSheet.create({
  title:{
    fontSize:35,
    margin:20,
    textAlign:'center'
  },
  desc:{
    fontSize:20,
    padding:20
  }

})