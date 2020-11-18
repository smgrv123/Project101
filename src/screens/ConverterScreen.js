import React, { useState,useEffect } from 'react'
import { Text, View } from 'react-native'
import { FlatList, TextInput } from 'react-native-gesture-handler';
import Axios from 'axios'

export default ConverterScreen = () => {
  const [converter, setConverter] = useState([]);

  useEffect(() => {
    fetch("https://api.exchangeratesapi.io/latest")
    .then(res=>res.json())
    .then(
      data=>{
        setConverter([data])
      })
    // Axios.get('https://api.exchangeratesapi.io/latest').then(
    //   res=>{
    //     res.data.results.forEach(val=>{
    //       var temp=[];
    //       temp.push(res)
    //     })
    //     setConverter(temp)
    //     console.log(converter)
    //   }
    // )
  }, [])  

  console.log(converter)

  return (
    <View>
      <Text>
        ConverterScreenss
      </Text>
      <FlatList
        data={converter}
        renderItem={({item}) => (

            <Text>
              {Object.keys(item.rates)}
            </Text> 

        )}
        keyExtractor={item=>Object.keys( item.rates).toString()}
      />
    </View>
  )
}