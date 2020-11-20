import React from 'react'
import {Image} from 'react-native'
import TodoScreen from '../screens/TodoScreen'
import NewsScreen from '../screens/NewsScreen'
import ConverterScreen from '../screens/ConverterScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome5';
import Image1 from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

export default BottomTab = () => {
  return (
    
      <Tab.Navigator>
        <Tab.Screen component={TodoScreen} name='Todo List' 
        options={{
          tabBarIcon: () => (
            <Icon
            name='clipboard-list' size={30} color='black'
            />
         ), 
         tabBarLabel: 'Todo'             
        }} />
        <Tab.Screen component={NewsScreen} name='NewsScreen' 
        options={{
          tabBarIcon: () => (
            <Icon
            name='newspaper' size={30} color='black'
            />
         ), 
         tabBarLabel: 'News'             
        }} />
        <Tab.Screen component={ConverterScreen} name='ConverterScreen'  
        options={{
          tabBarIcon: () => (
            <Image1 name="home-currency-usd" size={30} color='black' />
         ), 
         tabBarLabel: 'Converter'             
        }}/>
        
      </Tab.Navigator>
    
  )
}
