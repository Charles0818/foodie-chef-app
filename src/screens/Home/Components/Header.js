import React from 'react';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { View, Text, Dimensions, ImageBackground, StyleSheet } from 'react-native';
import {  Button, Modal, FilePicker, Utils } from '../../../components';
import { Section } from '../../Wrapper';
import { styles, colors } from '../../styles';
import { useNavigation } from '@react-navigation/core';
const { useDrawUpModal } = Modal;
const { NavigationIcons: { NotificationBell } } = Utils;

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={[styles.justifyContent_end, {height: 80}]}>
      <View style={[styles.row, styles.justifyContent_between, styles.alignItems_center, styles.padding_sm]}>
        <View style={[homeStyle.headerIcon, styles.marginRight_md, styles.overflow_h]}>
          <Button style={[styles.flexCenter, {flex: 1}]} action={() => navigation.openDrawer()}>
            <FontAwesome5 name="bars" size={16} color={colors.color1} />
          </Button>
        </View>
        <View style={[styles.row, styles.alignItems_center]}>
          <View style={[homeStyle.headerIcon, styles.marginRight_md, styles.overflow_h]}>
            <Button action={() => navigation.navigate("Home")} style={[styles.flexCenter, {flex: 1}]}>
              <FontAwesome5 name="search" size={16} color={colors.dark} />
            </Button>
          </View>
          <View style={[homeStyle.headerIcon, styles.marginRight_md, styles.overflow_h]}>
            <Button style={[styles.flexCenter, {flex: 1}]} action={() => console.log('Button clicked')}>
              <FontAwesome5 name="share-alt" size={16} color={colors.dark} />
            </Button>
          </View>
          <View style={[homeStyle.headerIcon]}>
            <NotificationBell />
          </View>
        </View>
      </View>
    </View>
  )
}

const homeStyle = StyleSheet.create({
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  }
})

export default Header;