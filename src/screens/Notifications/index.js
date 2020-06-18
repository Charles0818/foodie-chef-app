import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import TimeAgo from 'react-native-timeago';
import { Screen, Section } from '../Wrapper';
import { styles, colors } from '../styles';
import { Button, Utils } from '../../components';
import { useNavigation } from '@react-navigation/core';

const notifications = [
  {
    type: 'discount',
    message: 'Get 15% discount up to 70% when you hav a splednfnd',
    thumbnail: require('../../assets/peppered-snail.jpg'),
    timestamp: new Date(),
  },
  {
    type: 'booking',
    message: 'Here is an order from Charles',
    thumbnail: require('../../assets/nigerian-abacha-african-salad-5-ingredients.jpg'),
    timestamp: new Date(),
  },
  {
    type: 'food',
    message: 'Rescheduling of your order has been successfully granted',
    thumbnail: require('../../assets/peppered-snail.jpg'),
    timestamp: new Date(),
  },
  {
    type: 'discount',
    message: 'Get 15% discount up to 70% when you',
    thumbnail: require('../../assets/peppered-snail.jpg'),
    timestamp: new Date(),
  },
  {
    type: 'packages',
    message: "Today's food order has been successfully delivered",
    thumbnail: require('../../assets/peppered-snail.jpg'),
    timestamp: new Date(),
  },
  {
    type: 'packages',
    message: "Today's food order has been successfully delivered",
    thumbnail: require('../../assets/peppered-snail.jpg'),
    timestamp: new Date(),
  },
]
const Notifications = ({ navigation }) => {
  return (
    <Screen style={[styles.paddingTop_sm, styles.paddingHorizontal_sm, styles.paddingBottom_sm, styles.bg_white]}>
      {notifications.map((notification, index) => <Notification  key={index} notification={notification} />)}
    </Screen>
  )
}

const Notification = ({notification}) => {
  const { navigate } = useNavigation();
  const { message, timestamp, type, thumbnail } = notification;
  return (
    <Button style={[styles.row, notificationStyle.container]}>
      <View style={[styles.marginRight_sm, styles.paddingVertical_sm]}>
        <Image style={[styles.border_r_5, notificationStyle.thumbnail]} source={thumbnail} />
      </View>
      <View style={[styles.slimBorderBottom, styles.paddingVertical_sm, {flex: 1}]}>
        <Text style={[styles.font_sm, styles.fontWeight_700, styles.marginBottom_xsm, styles.capitalize]}>{type}</Text>
        <Text numberOfLines={1} style={[styles.font_md, styles.fontWeight_700, styles.marginBottom_sm]}>{message}</Text>
        <TimeAgo time={"2020-05-11T07:36:32.482Z"} style={[styles.font_sm, styles.fontWeight_700, styles.color_gray]} />
      </View>
    </Button>
  )
}

const notificationStyle = StyleSheet.create({
  container: {
    width: '100%',
    height: 120,
    ...styles.paddingHorizontal_sm,
  },
  thumbnail: {
    width: 120,
    flex: 1,
  }
})
export default Notifications;
