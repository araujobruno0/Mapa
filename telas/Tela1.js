import { StatusBar } from 'expo-status-bar';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import  { useState } from 'react';



export default function Tela1({navigation}) {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [title, setTitle] = useState(0);
  const [description, setDescription] = useState(0);
  
  fetch("https://mobile.ect.ufrn.br:3003/markers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer vv7oTsHdw0X9g5e7QbniP58j3iJY4h6AoOSxMIw2X8xjokSHjF",
      },
      body: JSON.stringify({
        latitude: latitude,
        longitude: longitude,
        title: title,
        description: description,
      }),
    })
      
    const [mark, setMark] = useState([]);

    async function fetchData() {
      const res = await fetch("https://mobile.ect.ufrn.br:3003/markers", {
        headers: {
          Authorization: 'Bearer vv7oTsHdw0X9g5e7QbniP58j3iJY4h6AoOSxMIw2X8xjokSHjF',
        },
      });
      const markers = await res.json();
  
      setMark(markers);
    }
    fetchData();
 

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
     
      <MapView style={styles.map}>
      
      {mark.map((ma) => (
          <Marker
            key={ma.id}
            title={ma.title}
            description={ma.description}
            coordinate={{
              latitude: ma.latitude,
              longitude: ma.longitude,
            }}
          style={styles.maps}>
           
          </Marker>
    ))}
      </MapView>
      
      <TouchableOpacity style={styles.button} onPress ={() => navigation.navigate('Tela2')}>
      <Image style = {styles.img} source = {require('../assets/mais.png')}/>
       </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map:{
    height: 1100,
    width: 500,
    backgroundColor: '#fff',
    position: 'absolute'
  },
  button:{
    height: 80,
    width: 80,
    borderRadius: 40,
   backgroundColor: '#3A6332',
   marginLeft: 300,
   marginTop: 600,
   alignContent: 'center',
   justifyContent: 'center'
   
  },
  img: {
      height: 40,
      width: 40,
      marginLeft: 20
  }
});