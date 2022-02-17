import { StatusBar } from 'expo-status-bar';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import  { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';

export default function Tela2({navigation}) {


    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [title, setTitle] = useState(" ");
    const [description, setDescription] = useState();

    const setPoints = (e) => {
        setLatitude(e.nativeEvent.coordinate.latitude);
        setLongitude(e.nativeEvent.coordinate.longitude);
      };
    
    function logar(){

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
      })}
        
      const [variavel, setVariavel] = useState([]);
  
      async function fetchData() {
        const res = await fetch("https://mobile.ect.ufrn.br:3003/markers", {
          headers: {
            Authorization: 'Bearer vv7oTsHdw0X9g5e7QbniP58j3iJY4h6AoOSxMIw2X8xjokSHjF',
          },
        });
        const markers = await res.json();
    
        setVariavel(markers);
      }
      fetchData();


 





  return (
    <View style={styles.container}>
      
      <StatusBar style="auto" />

      <MapView style={styles.map} onPress={setPoints}>
        <Marker
          coordinate={{ latitude: latitude, longitude: longitude }}
          title={title}
          description={description}
        />
      </MapView>
      
      <TouchableOpacity style={styles.button} onPress ={() => navigation.navigate('Tela1')}>
      <Image style = {styles.img} source = {require('../assets/volta.png')}/>
       </TouchableOpacity>
    
    <View style ={styles.adicionar}>
    <TextInput style = {styles.input} 
               placeholder = "Título:" 
               onChangeText={(e) => setTitle(e)}/>
              
    <TextInput style = {styles.input} 
               placeholder = "Descrição:" 
               onChangeText={(e) => setDescription(e)}/>

<TouchableOpacity style = {styles.enviar} onPress = {() => logar()}
               >
                   
                  <Text style = {styles.botaoEnviar} >Marcar</Text>
               </TouchableOpacity>

    </View>
     
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
        height: 60,
        width: 60,
        borderRadius: 40,
       backgroundColor: '#3A6332',
      marginRight: 500,
       marginEnd: 300,
       
       alignContent: 'center',
       justifyContent: 'center'
       
      },
      img: {
        height: 20,
        width: 20,
        marginLeft: 19
    },
    adicionar:{
        height: 180,
        width: 350,
        backgroundColor: '#3A6332',
       marginTop: 450,
        borderRadius: 20,
       
        alignItems: 'center'
    },
    input:{
        height: 48,
        width: 320,
        backgroundColor: '#CBDB43',
        borderRadius: 15,
        
       marginTop: 10
    },
    enviar: {
        height: 48,
        width: 100,
        backgroundColor: '#fff',
        borderRadius: 15,
        
       marginTop: 10,
       justifyContent: 'center',
       alignItems: 'center'
    }
});
