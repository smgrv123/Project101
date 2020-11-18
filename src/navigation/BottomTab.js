import React from 'react'
import {Image} from 'react-native'
import TodoScreen from '../screens/TodoScreen'
import NewsScreen from '../screens/NewsScreen'
import ConverterScreen from '../screens/ConverterScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator();

export default BottomTab = () => {
  return (
    
      <Tab.Navigator>
        <Tab.Screen component={TodoScreen} name='Todo List' />
        <Tab.Screen component={NewsScreen} name='NewsScreen' 
        options={{
          tabBarIcon: () => (
            <Image
              style={{
                height:25,
                width:50
              }}
              source={require('../images/newclip.jpg')                  
              }/>
         ), 
         tabBarLabel: 'News'             
        }} />
        <Tab.Screen component={ConverterScreen} name='ConverterScreen'  
        options={{
          tabBarIcon: () => (
            <Image
              style={{
                height:35,
                width:35
              }}
              source={require('../images/currency.png')                  
              }/>
         ), 
         tabBarLabel: 'Converter'             
        }}/>
        
      </Tab.Navigator>
    
  )
}
