/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput, Keyboard,
  
} from 'react-native';


import MapView from './src/Map'

import Geolocation from 'react-native-geolocation-service';


import { checkPermission } from './src/CheckPermission'
import { fetchPlaces, queryPlaces } from './src/Requests'


const App = () => {
  const [region, setRegion] = useState([]);
  const [list, setList] = useState([]);
  const [value, setValue] = useState("");
  const [nearbyPlaces, setNearbyPlaces] = useState([]);

  useEffect(() => {

    checkPermission().then((value) => {
      if (value) {
        Geolocation.getCurrentPosition(
          (position) => {
            let longitude = position.coords.longitude;
            let latitude = position.coords.latitude;
            setRegion([longitude, latitude])

            fetchNearby(longitude, latitude)
          },
          (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      }
    })
  }, [])


  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (value.length < 3) {
        setList([])
        return
      }
      queryLocations()
    }, 500)

    return () => clearTimeout(delayDebounce)
  }, [value])


  const fetchNearby = (long, lat) => {

    fetchPlaces(long, lat).then(res => {

      setNearbyPlaces(res.features)

    })
      .catch(error => {
        console.log(error);
      });

  }

  const queryLocations = () => {

    queryPlaces(value).then(res => {

      setList(res.features)

    })
      .catch(error => {
        console.log(error);
      });

  }

  const onItemPress = (item) => {

    setRegion(item.center)
    setList([])
    setValue("")
    Keyboard.dismiss()

    fetchNearby(item.center[0], item.center[1])

  }

  const renderList = () => {
    return list.map((item) => <Text key={item.id} onPress={() => onItemPress(item)} style={{ padding: 10, color: 'white' }}>{item.place_name}</Text>)
  }

  const renderPlaces = () => {
    return nearbyPlaces.map((item) => <Text key={item.id} style={{ padding: 10, backgroundColor: '#f2f2f2', margin: 10, borderRadius: 5 }}>{item.place_name}</Text>)
  }

  return (


    <View
      style={{ flex: 1 }}
    >
      {region.length > 0 &&
          <MapView region={region} places={nearbyPlaces}></MapView>
      }


      <View >
        <TextInput
          style={{ margin: 10, height: 40, borderColor: "grey", borderWidth: 1, borderRadius: 10 }}
          placeholder="Search Location"
          value={value}
          onChangeText={(text) => setValue(text)}
        >

        </TextInput>
        <View style={{ backgroundColor: '#252525', margin: 10, borderRadius: 10 }}>
          {renderList()}
        </View>
      </View>

      {renderPlaces()}
    </View>

  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,

  }
});

export default App;
