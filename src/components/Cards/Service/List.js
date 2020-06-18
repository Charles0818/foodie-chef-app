import React, { memo } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FadeIn } from '../../Animations';
import { service } from '../../Utils';
import { Button } from '../../Buttons';
import { colors, styles } from '../../styles';
import { useNavigation } from '@react-navigation/core';
const { DisplayRating } = service;

export default ListServiceCard = memo(()=> {
  const { navigate } = useNavigation();
  const service = {
    name: 'Little Creatures - Club Street'
  }
  return (
    <FadeIn style={[cardStyle.container, styles.marginBottom_md, styles.boxShadow_md]}>
      <Button style={[styles.padding_md]} activeOpacity={.6} action={() => navigate('ServiceRequest')}>
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
})

const cardStyle = StyleSheet.create({
  container: {
    width: (Dimensions.get('window').width) - 45,
    height: 'auto',
    borderRadius: 5,
    ...styles.bg_white,
    overflow: 'hidden'
  }
});