import React from 'react';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { View, Text, Dimensions, ImageBackground, StyleSheet } from 'react-native';
import {  Button, Modal, FilePicker, Utils } from '../../../components';
import { Section } from '../../Wrapper';
import { styles, colors } from '../../styles';
const { useDrawUpModal } = Modal;
const { NavigationIcons: { NotificationBell } } = Utils;

const Header = ({navigation}) => {
  const { image, pickImage, accessCamera } = FilePicker.usePermission();
  const { Modal, openModal, closeModal } = useDrawUpModal();
  const ImageSelectOptions = ({closeModal}) => {
    return (
      <View style={[styles.row, styles.padding_md]}>
        <View style={[styles.marginRight_lg]}>
          <Button action={() => {
              pickImage();
              closeModal()
              }}
            style={[styles.alignItems_center, styles.padding_md]}>
            <MaterialIcons name="photo" color={colors.color1} size={30} style={[styles.marginBottom_sm]} />
            <Text numberOfLines={1} style={[styles.font_md, styles.fontWeight_700]}>Gallery</Text>
          </Button>
        </View>
        <View style={[styles.border_r_5]}>
          <Button action={() => {
              accessCamera();
              closeModal()
            }}
            style={[styles.alignItems_center, styles.padding_md]}>
            <FontAwesome5 name="camera-retro" color={colors.color1} size={30} style={[styles.marginBottom_sm]} />
            <Text numberOfLines={1} style={[styles.font_md, styles.fontWeight_700]}>Camera</Text>
          </Button>
        </View>
      </View>
    )
  }

  return (
    <View style={{width: Dimensions.get('window').width, height: 300}}>
      <Button style={[{flex: 1}]} action={openModal}>
        <ImageBackground source={image ? {uri: image} : require('../../../assets/street-view.jpg')} style={{flex: 1}} resizeMethod="scale">
          <Section style={[styles.row, styles.justifyContent_between, styles.alignItems_center, styles.marginTop_md]}>
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
          </Section>
          <Modal closeOnBackdropPress={true}>
            <ImageSelectOptions closeModal={closeModal} />
          </Modal>
        </ImageBackground>
      </Button>
    </View>
  )
}

const homeStyle = StyleSheet.create({
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    ...styles.bg_white,
    ...styles.boxShadowDark_sm,
  }
})

export default Header;