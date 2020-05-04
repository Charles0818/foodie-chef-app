import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesome, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { Button } from '../Buttons';
import { styles, colors } from '../styles';

export const FreeDeliveryBadge = ({isExisting}) => {
  return isExisting && (
     <View style={[styles.border_r_10, styles.bg_color2, styles.padding_sm]}>
      <Text numberOfLines={1} style={[styles.color_white, styles.font_xsm,]}>Free delivery</Text>
    </View>
  )
}

export const DisplayRating = ({averageRating = 0, totalRatings = 0}) => {
  const formatRating = (totalRatings) => {
    switch(totalRatings) {
      case totalRatings === 0:
        return 'No rating'
      case totalRatings === 1:
        return `${totalRatings} rating`;
      default:
      return `${totalRatings} ratings`
    }
  }
  return (
    <View style={[styles.row, styles.alignItems_center]}>
      <MaterialIcons name="star" color={averageRating ? colors.color2 : colors.gray_color} size={20} style={[styles.marginRight_xsm]} />
      <Text style={[styles.fontWeight_700, styles.font_sm, styles.marginRight_xsm]}>{averageRating}</Text>
      <Text numberOfLines={1} style={[styles.color_gray, styles.font_sm,]}>({formatRating(totalRatings)})</Text>
    </View>
  )
}

