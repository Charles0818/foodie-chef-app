import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { styles, colors } from '../styles';
export const OnlineIndicator = ({style = []}) => {
  return <View style={[chatStyle.online, ...style]} />
}

const chatStyle = StyleSheet.create({
  online: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.green
  }
})