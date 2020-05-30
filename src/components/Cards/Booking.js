import React from 'react';
import { View, Text, ImageBackground, Image, Dimensions, StyleSheet } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { styles } from '../styles';
import { FadeIn } from '../Animations/index';
import { Button } from '../Buttons';
import { colors } from '../../styles';
import { dataConstants } from '../Utils';
import { useNavigation } from '@react-navigation/core';

const { bookingStatus } = dataConstants;
export default BookingCard = ({booking})=> {
  const { navigate } = useNavigation();
  let { items, duration, isNew, status, subtotal, address } = booking;
  if(status !== 'new' ) status = bookingStatus.find(el => el.name === status);
  return (
    <FadeIn style={[cardStyle.container, styles.marginBottom_md, styles.boxShadow_md]}>
      <Button style={[styles.padding_md]} activeOpacity={.6} action={() => navigate('ServiceRequest')}>
        <View style={[styles.row, styles.justifyContent_between]}>
          <View style={[styles.border_r_5, styles.marginRight_sm, {width: 100, height: 100}]}>
            <ImageBackground source={{uri: 'https://res.cloudinary.com/dx5lp5drd/image/upload/v1586035953/igbo-abacha-ncha_oeiamp.jpg'}}
              resizeMethod="scale" style={[styles.border_r_5, styles.overflow_h, {width: '100%', flex: 1, position: 'relative'}]}>
              {status === 'new' ?
              <View style={[styles.bg_color1, styles.flexCenter, styles.border_r_5,{width: 50, height: 20, }]}>
                <Text style={[styles.color_white, styles.fontWeight_700]}>{'new'}</Text>
              </View> : null }
            </ImageBackground>
            {status !== 'new' ? <View
              style={[styles.marginRight_sm, styles.flexCenter, { width: 30, height: 30, borderRadius: 15.5, borderColor: '#fff', backgroundColor: status.color, position: 'absolute', bottom: 3, right: -17 }]}>
              <Text style={[styles.font_lg, styles.fontWeight_700, styles.capitalize, styles.color_white]}>{status.name.slice(0, 1)}</Text>
            </View> : null }
          </View>
          <View style={[styles.justifyContent_between, styles.marginRight_md, {flex: 1.5}]}>
            <Text numberOfLines={2} style={[styles.font_md, styles.fontWeight_700, styles.capitalize, styles.marginBottom_xsm]}>{items[0].name}</Text>
            <Text numberOfLines={1} style={[styles.color_gray, styles.font_sm, styles.marginBottom_xsm]}>{duration.start} to {duration.end}</Text>
            <View style={[styles.row, styles.alignItems_center, styles.marginBottom_sm]}>
              <MaterialIcons name="location-on" color={colors.gray_color} size={16} style={[styles.marginRight_xsm]} />
              <Text numberOfLines={1} style={[styles.color_gray, styles.font_sm,]}>{address}</Text>
            </View>
          </View>
          <View style={[styles.justifyContent_between, styles.alignItems_end, {flex: .5}]}>
            <View style={[styles.flexCenter, styles.border_r_5, styles.bg_color2, {width: 70, height: 30}]}>
              <Text numberOfLines={1} style={[styles.color_white, styles.fontWeight_700, styles.font_sm]}>${subtotal}</Text>
            </View>
            <Button>
              <FontAwesome5 name="tag" size={25} color={colors.color3} style={{transform: [{rotate: '45deg'}]}}/>
            </Button>
          </View>
        </View>
      </Button>
    </FadeIn>
  )
}

const cardStyle = StyleSheet.create({
  container: {
    width: (Dimensions.get('window').width) - 45,
    height: 'auto',
    borderRadius: 5,
    ...styles.bg_white,
    overflow: 'hidden'
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