import React, { useState, useEffect } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler'
import auth from '@react-native-firebase/auth';
import Store from './Store'

export default Login = (props) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [])

  function createUser() {
    auth()
      .signInWithEmailAndPassword(email, pass)
      .then(() => {
        Alert.alert(' Signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          Alert.alert('User not found!');
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid!');
        }
        if(error.code === 'auth/wrong-password'){
          Alert.alert('Wrong Password');
        }
        console.log(error);
      });
  }

  function logout() {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }
  if (initializing) return null;

  if (!user) {
    return (
      <View
        style={styles.view}
      >
        <Text style={styles.text}>
          SIGNIN
        </Text>
        <TextInput
          style={styles.textinput}
          placeholderTextColor='white'
          placeholder='Enter E-mail address'
          keyboardType='email-address'
          onChangeText={(text) => {
            setEmail(text)
          }}
        />
        <TextInput
          style={styles.textinput}
          placeholderTextColor='white'
          placeholder='Enter Password'
          secureTextEntry={true}
          onChangeText={(text) => {
            setPass(text)
          }}
        />
        <TouchableOpacity
          style={styles.button1}
          onPress={() => {
            if (email == "" || email == null || pass == '' || pass == null) {
              Alert.alert("Please enter email and password")
            }
            else {
              { createUser() }
            }
          }}
        >
          <Text style={styles.text}>
            SIGNIN
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <View style={styles.view}>
      <Text style={{
        color:'white',
        textAlign:'center',
        marginTop:100,
        marginBottom:-100,
        fontSize:20
      }}>
        Welcome {user.email}
      </Text>
      <TouchableOpacity
      style={styles.button1}
        onPress={() => {
          Store.email=user.email
          console.log(Store.email)
          props.navigation.replace("BottomTab");
        }}
      >
        <Text style={styles.text}>
          Enter
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
      style={styles.button}
        onPress={() => {
          { logout() }
        }}
      >
        <Text style={styles.text}>
          LOGOUT
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  textinput: {
    borderBottomWidth: 0.5,
    margin: 20,
    marginTop: 50,
    fontSize: 17,
    borderColor: 'white'
  },
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  },
  button: {
    borderWidth: 5,
    borderColor: 'dimgray',
    backgroundColor: 'dimgray',
    borderRadius: 10,
    margin: 25,
    marginTop: 0
  },
  view: {
    backgroundColor: '#004040',
    flex: 1
  },
  button1: {
    borderWidth: 5,
    borderColor: 'dimgray',
    backgroundColor: 'dimgray',
    borderRadius: 10,
    margin: 25,
    marginTop: 250
  }
  
})