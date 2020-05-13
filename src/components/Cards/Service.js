import React from 'react';
import { View, Text, ImageBackground, Image, Dimensions, ActivityIndicator, StyleSheet } from 'react-native';
import { FontAwesome, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { styles } from '../styles';
import { ScaleToSize, FadeIn } from '../Animations/index';
import { service } from '../Utils';
import { Button } from '../Buttons';
import { colors } from '../../styles';
const { DisplayRating } = service;
export const SquareServiceCard = (props) => {
  const { service, navigation } = props;
  // const { id, name, price, thumbnail } = service;
  return (
    <ScaleToSize
      style={[cardStyle.container, styles.paddingVertical_sm,  styles.marginRight_sm, styles.marginBottom_sm]}>
      <View style={[styles.marginBottom_sm]}>
        <Text numberOfLines={1} style={[styles.font_md, styles.marginBottom_sm, styles.fontWeight_700,]}>Ruth's Chris Steak house</Text>
        <View style={[styles.row, styles.alignItems_center, styles.marginBottom_sm]}>
          <View style={[styles.row, styles.alignItems_center, styles.marginRight_sm]}>
            <MaterialIcons name="location-on" color={colors.gray_color} size={16} style={[styles.marginRight_xsm]} />
            <Text style={[styles.color_gray, styles.fontWeight_700, styles.font_xsm,]}>Salt lake city</Text>
            {/* country flag*/}
          </View>
          <View style={[styles.row, styles.alignItems_center]}>
            <FontAwesome5 name="clock" color={colors.gray_color} size={16} style={[styles.marginRight_sm]} />
            <Text numberOfLines={1} style={[styles.font_xsm, styles.color_gray, styles.fontWeight_700,]}>8 Aug. 2018 at 5.16PM</Text>
          </View>
        </View>
        <View style={[styles.row]}>
          <View style={[styles.bg_gray, styles.border_r_10, {padding: 7}]}>
            <Text numberOfLines={1} style={[styles.font_xsm, styles.color_gray, styles.fontWeight_700,]}>Streak houses</Text>
          </View>
        </View>
      </View>
      <Button action={() => navigation.navigate("Service", { service })}>
        <ImageBackground
          source={{uri: 'https://res.cloudinary.com/dx5lp5drd/image/upload/v1586035953/igbo-abacha-ncha_oeiamp.jpg'}}
          resizeMode="cover" resizeMethod="scale"
          style={[cardStyle.thumbnail, styles.marginBottom_xsm]}
          resizeMethod="scale"
          loadingIndicatorSource={<ActivityIndicator animating={true} size={30} color="#ff680a" />}>
        </ImageBackground>
      </Button>
      <View style={[styles.row, styles.alignItems_center, styles.padding_sm]}>
        <View style={[styles.row, styles.alignItems_center, styles.marginRight_md]}>
          <FontAwesome name="heart" color={colors.gray_color} size={16} style={[styles.marginRight_sm]} />
          <Text numberOfLines={1} style={[styles.color_gray, styles.fontWeight_700, styles.font_sm]}>{367} Likes</Text>
        </View>
        <View style={[styles.row, styles.alignItems_center, styles.marginRight_md]}>
          <FontAwesome name="comment" color={colors.gray_color} size={16} style={[styles.marginRight_sm]} />
          <Text numberOfLines={1} style={[styles.color_gray, styles.fontWeight_700, styles.font_sm]}>{37} Comments</Text>
        </View>
      </View>
    </ScaleToSize>
  )
}

export const ListServiceCard = ({navigation})=> {
  
  // const action = () => navigation.dispatch(state => {
  //   // Remove the home route from the stack
  //   const routes = state.routes.find(r => r.name === 'ServiceRequest');
  //   console.log('r', state.routes)
  
  //   // return CommonActions.reset({
  //   //   ...state,
  //   //   routes,
  //   //   index: routes.length - 1,
  //   // });
  // })
  return (
    <FadeIn style={[cardStyle.container, styles.marginBottom_md, styles.boxShadow_md]}>
    <Button style={[styles.padding_md]} activeOpacity={.6} action={() => navigation.navigate('ServiceRequest')}>
      <View style={[styles.row]}>
        <View style={[styles.border_r_5, styles.overflow_h, styles.marginRight_sm, {width: 100, height: 100}]}>
          <Image source={{uri: 'https://res.cloudinary.com/dx5lp5drd/image/upload/v1586035953/igbo-abacha-ncha_oeiamp.jpg'}}
            resizeMethod="scale" style={[{width: '100%', flex: 1}]}
          />
        </View>
        <View style={[styles.justifyContent_between, {flex: 1}]}>
          <Text numberOfLines={2} style={[styles.font_lg, styles.fontWeight_700, styles.capitalize, styles.marginBottom_xsm]}>Little Creatures - Club Street</Text>
          <View>
            <View style={[styles.row, styles.alignItems_center, styles.marginBottom_sm]}>
              <MaterialIcons name="location-on" color={colors.gray_color} size={16} style={[styles.marginRight_xsm]} />
              <Text numberOfLines={1} style={[styles.color_gray, styles.font_xsm,]}>856 Esta Underpass</Text>
            </View>
            <View style={[styles.row, styles.justifyContent_between, styles.alignItems_center]}>
              <DisplayRating averageRating={4.8} totalRatings={233} />
              <Text numberOfLines={1} style={[styles.fontWeight_700, styles.color1]}>$ 67.00</Text>
            </View>
          </View>
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