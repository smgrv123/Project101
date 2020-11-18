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
      .createUserWithEmailAndPassword(email, pass)
      .then(() => {
        Alert.alert('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid!');
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
          LOGIN
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
        <Text style={{
          color: 'grey',
          marginLeft:50
        }}>
          Password should be a minimun of 6 characters
        </Text>
        <TouchableOpacity
          style={styles.button1}
          onPress={() => {
            props.navigation.navigate("SignIn")
          }}
        >
          <Text
            style={styles.text}
          >
            SIGN IN
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
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
            LOGIN
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
          props.navigation.replace("BottomTab");
          Store.email=user.email
          console.log(Store.email)
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