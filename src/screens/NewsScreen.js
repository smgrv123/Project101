import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image, TouchableNativeFeedback, Linking, Button } from 'react-native';
import Axios from 'axios';
// import Store from './Store';


export default NewsScreen = (props) => {
  const [News, setNews] = useState([]);
  const [load, setLoad] = useState(true)
  useEffect(() => {
    Axios.get('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=2719918152a7463492d900316ee90bf1').then(res => {
      var temp = [];
      setLoad(false)
      res.data.articles.forEach(nwz => {
        temp.push(nwz);
      })
      setNews(temp);
    })

  }, [])

  if (load) {
    return (
      <View
        style={{ backgroundColor: 'black', flex: 1 }}
      >
        <Image
          source={require('../images/newclip.jpg')}
          style={styles.image}
        />
      </View>
    )
  }
  else {
    return (
      <View
        style={{ backgroundColor: 'black' }}
      >
        <FlatList
          data={News}
          renderItem={({ item }) => (
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple("grey")}
              onPress={() => {
                Linking.openURL(item.url)
              }}
              style={{
                flexDirection: 'row',
              }}
            >
              <View>
                {
                  item.urlToImage == "" ? <Text style={styles.newstext}>No image available</Text> :
                    item.urlToImage == null ? <Text style={styles.newstext}>No image available</Text> :
                      <Image source={{ uri: item.urlToImage }} style={styles.newsimage} />
                }
                <Text
                  style={styles.newstext}
                >
                  {item.title == "" ? null : item.title == null ? null : item.title}
                </Text>
              </View>
            </TouchableNativeFeedback>
          )}
          keyExtractor={(item) => (item.title)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    alignItems: 'center',
    marginTop: 200,
    height: 219.05,
    width: 397.8,
  },
  newsimage: {
    width: 350,
    height: 200,
    flex: 1,
    borderRadius: 10,
    flexDirection: 'column',
    margin: 10,
    marginLeft: 20
  },
  newstext: {
    fontSize: 15,
    marginLeft: 10,
    padding: 5,
    color: 'white'
  }
})
