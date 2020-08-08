
import {
  PermissionsAndroid, Platform
} from 'react-native';

import Geolocation from 'react-native-geolocation-service';


export const checkPermission = async () => {
    if (Platform.OS == "ios") {
      const status = await Geolocation.requestAuthorization("whenInUse");
      if (status == "granted") {
        return true;
      } else {
        return false;
      }

    } else {
      let granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "App Geolocation Permission",
          message: "App needs access to your phone's location.",
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {

        //console.log("Permission Granted")
        return true
      } else {

        console.log('Location permission not granted!!!!');
        return false
      }
    }
  }
