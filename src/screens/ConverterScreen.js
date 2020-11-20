import React, { useState, useEffect } from 'react'
import { Text, View } from 'react-native'
import { FlatList, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker'

export default ConverterScreen = () => {
  const [converter, setConverter] = useState([]);
  const [rates, setRates] = useState([]);
  const [item, setItem] = useState('EUR')
  const [item1, setItem1] = useState('EUR')
  const [rate2, setRate2] = useState("");
  const [val, setVal] = useState('')
  var i, b = 0

  function value() {
    console.log("press1")
    for (i = 0; i < converter.length; i++) {
      if (item == converter[0] && item1 != converter[0]) {
        if (item1 == converter[i]) {
          a = rates[i - 1]
        }
      }
      else if (item != converter[0] && item1 == converter[0]) {
        if (item == converter[i]) {
          a = rates[i - 1]
        }
      }
      else {
        if (item === converter[i] || item1 === converter[i]) {
          console.log('h')
          if (item === converter[i]) {
            console.log('e')
            a = rates[i - 1]
          }
          if (item1 === converter[i]) {
            console.log('l')
            b = rates[i - 1]
          }
        }
      }
    }
    if (b === 0) {
      setRate2(a * val)
    }
    else if (b > a) {
      setRate2((b / a) * val)
    }
    else {
      setRate2((a / b) * val)
    }
  }

  useEffect(() => {
    fetch("https://api.exchangeratesapi.io/latest")
      .then(res => res.json())
      .then(
        data => {
          console.log(data)
          setRates([...Object.values(data.rates)])
          setConverter([data.base, ...Object.keys(data.rates)])

        })
  }, [])

  return (
    <View
    style={{backgroundColor:'black',flex:1}}
    >
      <Text
      style={{
        color:'white',
        fontSize:30
      }}
      >
        Converter Screen
      </Text>
      <TextInput
      style={{
        marginLeft:30,
        borderColor:'white',
        borderWidth:0.7,
        borderRadius:15,
        marginRight:30,
        marginTop:40,
        color:'white'
      }}
      placeholderTextColor='white'
        placeholder='enter value'
        onChangeText={(val) => {
          setVal(val)
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          marginTop: 30
        }}
      >
        <DropDownPicker
          style={{
            width: 100,
            marginLeft: '12%',

          }}
          placeholder={item}
          items={converter}
          containerStyle={{ height: 40 }}
          itemStyle={{
            justifyContent: 'flex-start'
          }}
          onChangeItem={(item) => {
            console.log(item)
            setItem(item)
          }}
        />
        <DropDownPicker
          placeholder={item1}
          style={{
            width: 100,
            marginLeft: '45%'
          }}
          items={converter}
          containerStyle={{ height: 40 }}
          itemStyle={{
            justifyContent: 'flex-start'
          }}
          onChangeItem={(item) => {
            console.log(item)
            setItem1(item)
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop:'5%'
        }}
      >
        <Text
          style={{
            marginLeft: '10%',
            color:'white'
          }}
        >
          {item}
        </Text>
        <Text
          style={{
            marginLeft: '60%',
            color:'white'
          }}>
          {item1}
        </Text>
      </View>

      
      <TouchableOpacity
      style={{
        borderWidth:4,
        borderRadius:15,
        borderColor:'dimgrey',
        marginLeft:'30%',
        marginRight:'30%',
        backgroundColor:'white',
      }}
        onPress={() => {
          value()
        }
        }
      >
        <Text
        style={{
          textAlign:'center',
          fontSize:25
        }}
        >
          press
        </Text>
      </TouchableOpacity>
      <Text
      style={{
        textAlign:'center',
        margin:50,
        fontSize:30,
        color:'white'
      }}
      >
        {rate2}
      </Text>
    </View>
  )
}