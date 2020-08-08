import React from 'react';
import MapboxGL from "@react-native-mapbox-gl/maps";
import { View, Text } from 'react-native';
import { TOKEN } from './config';

MapboxGL.setAccessToken(TOKEN);

export default MapBox = (props) => {

    return (
        <MapboxGL.MapView style={{ flex: 1 }}
          >
            <MapboxGL.Camera
              zoomLevel={10}
              centerCoordinate={props.region}
            />

            <MapboxGL.MarkerView coordinate={props.region}>
              <AnnotationContent title={"You"} />
            </MapboxGL.MarkerView>

            {props.places.map((item, index) =>
              <MapboxGL.MarkerView coordinate={item.center} key={index.toString()}>
                <AnnotationContent title={item.text}/>
              </MapboxGL.MarkerView>)
            }

          </MapboxGL.MapView>
    )
}


const AnnotationContent = ({ title }) => (
    <View style={{ borderColor: 'black', width: 60 }}>
  
      <View
        style={{
          //backgroundColor: 'white',
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{ padding: 5, backgroundColor: 'blue', borderRadius: 10 }}></View>
        <Text
          style={{
            color: 'black',
            fontWeight: title == "You" ? "bold" : "normal",
            fontSize: title == "You" ? 18 : 10,
            alignSelf: 'stretch',
            textAlign: 'center'
          }}>
          {title} </Text>
      </View>
    </View>
  );
  