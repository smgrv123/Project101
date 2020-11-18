import React, { useState } from 'react'
import { Alert, Image, StyleSheet, Text, View } from 'react-native'
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import firestore from '@react-native-firebase/firestore'
import Store from './Store'
import { useSafeArea } from 'react-native-safe-area-context'


export default AddToTodo = (props) => {

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');


  const usersCollection = firestore().collection('TodoList');

  const upload = () => {
      if (title !='' || desc!='') {
          // console.log(name, dlno, vlno, reason, amount)
          usersCollection.add({
              Email:Store.email,
              Title:title,
              Description:desc
          }).then(() => {
              Alert.alert("List updated....")
              console.log('User added!');
              props.navigation.replace('BottomTab')
          }).catch((err) => console.log(err));
      }
      else {
          alert("enter values in all the fields")
      }
  }

  return (
    <View style={{ backgroundColor: 'black', flex: 1 }}>
      <ScrollView>
        <TextInput
          style={styles.textinput}
          placeholderTextColor='#F5F5F5'
          placeholder='Title'
          onChangeText={(val) => {
            setTitle(val)
          }}
        />
        <TextInput
          style={styles.textinput}
          placeholderTextColor='#F5F5F5'
          placeholder='Description'
          multiline={true}
          onChangeText={(val) => {
            setDesc(val)
          }}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            upload()
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
              textAlign: 'center',
              margin: 4
            }}
          >
            Add To List
        </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  textinput: {
    fontSize: 18,
    marginTop: 40,
    margin: 20,
    borderWidth: 0.8,
    borderColor: 'dimgrey',
    borderRadius: 10,
    color: 'white'
  },
  button: {
    borderWidth: 5,
    borderColor: 'dimgray',
    backgroundColor: 'dimgray',
    borderRadius: 10,
    margin: 25,
    // marginTop: 350,
    // position:'relative'
  },
})