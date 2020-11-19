import React from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Store from '../screens/Store'
import firestore from '@react-native-firebase/firestore'

export default DisplayTodo = (props) => {
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
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          Alert.alert(
            'Completed',
            'Item will be deleted',
            [
              {
                text: 'Yes', onPress: () => {
                  firestore().collection('TodoList').where('Title', '==', Store.title).get()
                    .then(snap => {
                      snap.forEach(doc => {
                        doc.ref.delete();
                        Alert.alert("Item completed... Deleted from the list")
                        props.navigation.replace("BottomTab")
                      })
                    })
                }
              },
              {text:'No',onPress:()=>{console.log('not removed')}}
            ],
            {cancelable:true}
          );
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 25,
            textAlign: 'center',
            padding: 5,
            fontWeight: '600'
          }}
        >
          Completed
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 35,
    margin: 20,
    textAlign: 'center',
    color: "white"
  },
  desc: {
    fontSize: 20,
    padding: 20,
    color: "white"
  },
  button: {
    borderWidth: 5,
    borderColor: 'dimgray',
    backgroundColor: 'dimgray',
    borderRadius: 10,
    margin: 25,
    marginTop: 50
  },
})