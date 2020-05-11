import * as React from 'react';
import { View, Text, Image, Platform } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout, Polyline, Circle } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { styles, colors } from '../styles';
import { service } from '../Utils';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { useSpinner } from '../Spinners';

const customer = {
  location: { latitude: 67.8025255, longitude: -102.4351431 },
  name: "Charles Omoregie",
  image: require('../../assets/avatar.jpg'),
  address: "02113, 23, Salem str, Boston, MA"
}

const chef = {
  name: "Charles Omoregie",
  image: require('../../assets/avatar.jpg'),
  address: "02113, 65, Summer str, App 5r, Boston, MA, USA"
}

const { DisplayRating } = service;
const User = ({user}) => {
  const { name, image, address } = user;
  console.log('user' ,image)
  return (
    <View style={[styles.row, styles.border_r_5, {maxWidth: 300, height: 100}]}>
      <View style={[styles.marginRight_xsm, {width: 70, height: 100}]}>
        <Image source={require('../../assets/avatar.jpg')} style={{width: '100%', flex: 1,}} />
      </View>
      <View style={[styles.padding_sm, styles.bg_white]}>
        <Text numberOfLines={1} style={[styles.fontWeight_700, styles.font_md]}>{name}</Text>
        <Text numberOfLines={2} style={[styles.fontWeight_700, styles.color_gray, styles.font_sm]}>{address}</Text>
        <DisplayRating averageRating={4.8} totalRatings={2902} />
      </View>
    </View>
  )
}
const Map = ({ positions }) => {
  const zoom = React.useRef()
  // React.useEffect(() => {
  //   zoom.current.fitToSuppliedMarkers(
  //     [
  //       {latitude: 37.8025255, longitude: -122.4351431},
  //       {latitude: 37.771707, longitude: -122.4053769}
  //     ],
  //     true, // not animated
  //   );
  // }, [])
  const fitToCoordinates = () => {
    return [
      {latitude: 37.8025255, longitude: -122.4351431},
      {latitude: 37.771707, longitude: -122.4053769}
    ],
    {animated: true}
  }
  console.log('chef', chef)
  const apiKey = Platform.OS === 'ios'
    ? Constants.manifest.ios.config.googleMapsApiKey
    : Constants.manifest.android.config.googleMaps.apiKey
  console.log('android apiKey', Constants.manifest.android.config.googleMaps.apiKey)
  console.log('apiKey', apiKey)
  console.log('positions', positions)
  return (
    <MapView
    ref={ref => zoom.current = ref}
    fitToElements={true}
      provider={PROVIDER_GOOGLE}
      showsUserLocation
      style={{flex: 1}}
      initialRegion={{
        latitude: positions.customer.latitude,
        longitude: positions.customer.longitude,
        latitudeDelta: 0.09,
        longitudeDelta: 0.035
      }}
      
      onMapReady={() => {zoom.current.fitToSuppliedMarkers(['customer','chef'],{ edgePadding: 
        {top: 50,
          right: 50,
          bottom: 50,
          left: 50}, animated: true
  
      })}}
      followsUserLocation={true}
      
    >
      <Marker
        coordinate={{latitude: 37.8025255, longitude: -122.4351431}}
        draggable identifier="customer">
        <Callout>
          <User user={customer} />
        </Callout>
      </Marker>
      <Marker
        coordinate={{latitude: 33.8025255, longitude: -122.4451431}}
        draggable identifier="chef">
        <Callout>
          <User user={chef} />
        </Callout>
      </Marker>
      <MapViewDirections
        origin={{latitude: 37.3318456, longitude: -122.0296002}}
        destination={{latitude: 37.771707, longitude: -122.4053769}}
        apikey={apiKey}
        strokeWidth={5}
        strokeColor={colors.color1}
        timePrecision="now"
        onError={() => console.log('an error occured')}
      />
    </MapView>
   
  )
}
export const useMap = () => {
  const { Spinner, animating, setAnimating } = useSpinner(true)
  const [positions, setPositions] = React.useState({
    chef: {
      longitude: null, latitude: null,
    },
    customer: {
      longitude: null, latitude: null,
    }
  });
  const getPermission = React.useCallback(async () => {
    const { status } = await Permissions.getAsync(Permissions.LOCATION)
      if(status !== 'granted') {
        const response = await Permissions.askAsync(Permissions.LOCATION)
      }
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          setPositions({
            chef: { longitude, latitude },
            customer: { ...customer.location }
          });
          setAnimating(false);
          console.log({latitude, longitude});
        }, (error) => console.log(error)
      )
  }, [setPositions])
  React.useEffect(() => {
    getPermission()
  }, [getPermission])
  
  const GoogleMap = () => {
    if(animating) return Spinner
     return <Map positions={positions} />
  }
  return { GoogleMap }
}