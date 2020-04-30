import React from 'react';
import { View, Text, ImageBackground, Dimensions, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { helpers } from '../helpers';
import { styles } from '../styles';
import { ScaleToSize } from '../Animations/index';
import Button from '../Buttons';
const SquareServiceCard = (props) => {
  const { service, navigation } = props;
  // const { id, name, price, thumbnail } = service;
  return (
    <ScaleToSize
      style={[cardStyle.container, styles.boxShadow_sm, styles.marginRight_sm, styles.marginBottom_sm]}>
      <Button action={() => navigation.navigate("Service", { service })}>
        <ImageBackground
          source={{uri: 'https://res.cloudinary.com/dx5lp5drd/image/upload/v1586035953/igbo-abacha-ncha_oeiamp.jpg'}} resizeMode="cover"
          style={[cardStyle.thumbnail]}
          resizeMethod="scale"
          loadingIndicatorSource={<ActivityIndicator animating={true} size={30} color="#ff680a" />}>
          <View style={[styles.bg_darkOpacity, styles.padding_sm, cardStyle.desc]}>
            <Text numberOfLines={1} style={[styles.color_white, styles.font_md, styles.fontWeight_700, { textAlign: 'center' }]}>Dish title</Text>
          </View>
        </ImageBackground>
      </Button>
    </ScaleToSize>
  )
}

// const PortraitServiceCard = ()=> {
//   return (
    
//   )
// }

const cardStyle = StyleSheet.create({
  container: {
    width: (Dimensions.get('window').width) - 25,
    height: 'auto',
    borderRadius: 5,
    ...styles.boxShadow_sm,
  },
  thumbnail: {
    width: '100%',
    height: 250,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    overflow: 'hidden',
  },
  desc: {
    width: '100%',
    maxHeight: 35,
    justifyContent:'flex-end',
    flex: 1,
    position: 'absolute',
    bottom: 0,
  }
});

export default SquareServiceCard;