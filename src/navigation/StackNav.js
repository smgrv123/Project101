import React from 'react'
import { } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import BottomTab from './BottomTab'
import SignIn from '../screens/SignIn'
import Login from '../screens/Login'
import AddToTodo from '../screens/AddToTodo'
import DisplayTodo from '../screens/DisplayTodo'

const Stack = createStackNavigator();

StackNav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen component={Login} name='Login' options={{ headerShown: false }} />
        <Stack.Screen component={SignIn} name='SignIn' options={{ headerShown: false }} />
        <Stack.Screen component={BottomTab} name='BottomTab' options={{ headerShown: false }} />
        <Stack.Screen component={AddToTodo} name='AddToTodo' options={{ headerShown: false }} />
        <Stack.Screen component={DisplayTodo} name='DisplayTodo' options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNav;