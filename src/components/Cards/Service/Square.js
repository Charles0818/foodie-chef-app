import React from 'react';
import { View, Text, ImageBackground, Dimensions, ActivityIndicator, StyleSheet } from 'react-native';
import { FontAwesome, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { ScaleToSize } from '../../Animations';
import { Button } from '../../Buttons';
import { styles, colors } from '../../styles';
export default SquareServiceCard = (props) => {
  const { navigation } = props;
  const service = {
    name: "Ruth's Chris Steak house"
  }
  return (
    <ScaleToSize
      style={[cardStyle.container, styles.paddingVertical_sm,  styles.marginRight_sm, styles.marginBottom_sm]}>
      <View style={[styles.marginBottom_sm]}>
        <Text numberOfLines={1} style={[styles.font_md, styles.marginBottom_sm, styles.fontWeight_700,]}>Ruth's Chris Steak house</Text>
        <View style={[styles.row, styles.alignItems_center, styles.marginBottom_sm]}>
          <View style={[styles.row, styles.alignItems_center, styles.marginRight_sm]}>
            <MaterialIcons name="location-on" color={colors.gray_color} size={16} style={[styles.marginRight_xsm]} />
            <Text style={[styles.color_gray, styles.fontWeight_700, styles.font_xsm,]}>Salt lake city</Text>
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
      <Button action={() => navigation.navigate("ServiceRequest")}>
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
  }
});