import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import Store from './Store'
import firestore from '@react-native-firebase/firestore'
import { FlatList } from 'react-native-gesture-handler';


export default TodoScreen = (props) => {

  const [todo, setTodo] = useState('');
  const [load,setLoad]=useState(true);

  useEffect(() => {
    var temp = []
    firestore().collection('TodoList').where('Email', '==', Store.email).get().then((snap) => {
      snap.docs.forEach(doc => {
        temp.push(doc.data())
        setTodo(temp);
        setLoad(false)
      })
    })
  }, [])

  console.log(todo)
if(load){
  return(
    <View>
      <ActivityIndicator
      style={styles.loading}
      animating={load}
      size={70}
      color='dimgrey'
      />
    </View>
  )
}
  return (
    <View
      style={{
        backgroundColor: 'black',
        flex: 1
      }}
    >
      <Text
        style={{
          color: 'white',
          textAlign: 'center',
          margin: 10,
          fontSize: 25
        }}
      >
        User {Store.email}
      </Text>
      <FlatList
        data={todo}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              style={styles.des}
              onPress={() => {
                props.navigation.navigate("DisplayTodo")
                Store.title=item.Title
                Store.desc=item.Description
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 25
                }}
              >
                {item.Title}
              </Text>

            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.Title}
      />
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("AddToTodo")
        }}
        style={styles.floatingbutton}
      >
        <Image
          source={require('../images/floatingaction.png')}
          style={styles.floatingimage}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  floatingbutton: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '83%',
    marginTop: 590
  },
  floatingimage: {
    resizeMode: 'center',
    width: 70,
    height: 70,
    borderRadius: 50
  },
  des: {
    margin: 15,
    borderWidth: 3,
    borderRadius: 10,
    elevation: 8,
    backgroundColor: 'white',
    borderColor: 'dimgrey'
  },
  loading:{
    alignContent:'center',
    marginTop:300

  }
})