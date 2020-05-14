import React from 'react';
import { View, Text, Image, ImageBackground, ScrollView, Dimensions, StyleSheet, Animated } from 'react-native';
import { FontAwesome5, MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { Linking } from 'expo';
import { Screen, Section } from './Wrapper';
import { styles, colors } from './styles';
import { Button, Utils, Modal, Carousels, Map, Animations} from '../components';
import { useNavigation } from '@react-navigation/core';

const { formatting: { quantifier } } = Utils;
const { useResizableDrawUpModal } = Modal;
const { ComponentCarousel } = Carousels;
const { useMap } = Map;

export const OpenModalButton = ({action}) => {
  return (
    <Animations.FadeIn style={[styles.boxShadow_sm, { position: 'absolute',width: 50, height: 50, borderRadius: 25, overflow:'hidden',bottom: 15, right: 20}]}>
      <Button action={action} style={[styles.flexCenter, styles.bg_white,{ flex:1,}]}>
        <MaterialIcons name="visibility" size={30} color={colors.color1} />
      </Button>
    </Animations.FadeIn>
  )
}
const ServiceDetail = () => {
  
  const {
    Modal, collapseModal, expandModal, modalVisible, closeModal, openModal, isCollapsed, height
  } = useResizableDrawUpModal(true);
  console.log('isCollapsed', isCollapsed)
  return (
    <Screen>
      <MapInterface />
      {!modalVisible && <OpenModalButton action={openModal} />}
      <Modal>
        <Detail
          modalControl={{
            collapseModal, expandModal, closeModal,
            openModal, isCollapsed, modalVisible,
          }}
        />
      </Modal>
    </Screen>
  )
}

const MapInterface = React.memo(() => {
  const { GoogleMap } = useMap();
  return (
    <Animated.View style={[serviceStyle.mapContainer, {height: Dimensions.get('window').height}]}>
      <GoogleMap />
    </Animated.View>
  )
})

const Detail = (props) => {
  const { modalControl: { expandModal, collapseModal, isCollapsed, modalVisible, closeModal } } = props;

  return (
    <Section style={[styles.paddingHorizontal_md]}>
      <View style={[styles.flexCenter]}>
        <View style={[styles.avatar, styles.marginRight_sm, {overflow: 'hidden', borderStyle: 'dashed', transform: [{translateY: -styles.avatar.height / 2}]} ]}>
          <Image source={require('../assets/avatar.jpg')} style={{width: '100%', overflow: 'hidden', flex: 1 }} />
        </View>
      </View>
      <View style={[{position: 'absolute', top: -12, right: 10}]}>
        <Button style={[styles.flexCenter, styles.bg_gray, {width: 30, height: 30, borderRadius: 15, overflow: 'hidden'}]} action={closeModal}>
          <MaterialCommunityIcons name="close" size={16} color={colors.gray_color} />
        </Button> 
      </View>
      <View style={[styles.overflow_h]}>
        <View style={[styles.flexCenter, styles.marginBottom_sm]}>
          <Text numberOfLines={1} style={[styles.font_sm, styles.color_gray, styles.fontWeight_700, styles.marginBottom_xsm]}>Your Customer</Text>
          <Text numberOfLines={1} style={[styles.font_md, styles.fontWeight_700, styles.marginBottom_xsm]}>Sabrina Lorenshtein</Text>
          <View style={[styles.row, styles.alignItems_center]}>
            <Text numberOfLines={1} style={[styles.font_xsm, styles.fontWeight_700, styles.marginRight_xsm]}>Invoice No.</Text>
            <Text numberOfLines={1} style={[styles.font_xsm, styles.color_gray, styles.fontWeight_700, styles.marginRight_xsm]}>30WT43GD546</Text>
            <Button style={[]}>
              <MaterialCommunityIcons name="file-pdf" size={20} color={colors.color2} />
            </Button>
          </View>
        </View> 
        <View style={[styles.marginBottom_md, styles.overflow_h]}>
          <View style={[styles.row, styles.flexCenter]}>
            <Text numberOfLines={1} style={[styles.font_sm, styles.fontWeight_700, styles.marginRight_xsm]}>PickUp by:</Text>
            <Text numberOfLines={1} style={[styles.font_sm, styles.color1, styles.fontWeight_700]}>3:22 PM</Text>
          </View>
          <Text style={[styles.color_gray, styles.font_xsm, styles.fontWeight_700, styles.marginBottom_xsm]}>Order Details:</Text>
          <View style={[styles.row, styles.alignItems_center, styles.justifyContent_between]}>
            <Text style={[styles.fontWeight_700, styles.font_xsm]}>Pick Up {quantifier(4, 'item')}</Text>
            <View style={[styles.row, styles.alignItems_center]}>
              <Text style={[styles.fontWeight_700, styles.font_md, styles.marginRight_xsm]}>Subtotal:</Text>
              <Text style={[styles.fontWeight_700, styles.color1, styles.font_md]}>$44.54</Text>
            </View>
          </View>
        </View>
          <Actions />
        <OrderDetails />
      </View>
    </Section>
  )
}

const Actions =() => {
  const { navigate } = useNavigation()
  return (
    <View style={[styles.marginBottom_md, styles.slimBorderBottom]}>
      <View style={[styles.row, styles.alignItems_center, styles.marginBottom_md]}>
        <View style={[styles.border_r_35, styles.marginRight_sm, styles.overflow_h, {flex: 1}]}>
          <Button action={() => navigate('Chat',  { chatId: 1, username: 'Julius', lastSeen: '11:53 PM', isActive: false })}
            style={[styles.border_r_35, styles.flexCenter, styles.slimBorder, styles.padding_md,]}>
            <Ionicons name="ios-chatbubbles" size={20} color={colors.gray_color} />
          </Button>
        </View>
        <View style={[styles.border_r_35, styles.marginRight_sm, styles.overflow_h, {flex: 1}]}>
          <Button action={() => Linking.openURL('tel:+123456789')} style={[styles.border_r_35, styles.flexCenter, styles.slimBorder, styles.padding_md,  {backgroundColor: colors.google_green}]}>
            <Ionicons name="ios-call" size={20} color={colors.white} />
          </Button>
        </View>
      </View>
      <View style={[styles.border_r_35, styles.overflow_h,]}>
        <Button style={[styles.border_r_35, styles.bg_color1, styles.flexCenter, styles.padding_md, ]}>
          <Text numberOfLines={1} style={[styles.font_md, styles.color_white, styles.uppercase, styles.fontWeight_700,]}>Click after delivery</Text>
        </Button>
      </View>
    </View>
  )
}

const OrderDetails = (details) => {
  return (
    <ScrollView style={{maxHeight: 300,}} showsVerticalScrollIndicator={false} >
      <View style={[styles.slimBorderBottom, styles.paddingVertical_sm]}>
        <Text numberOfLines={1} style={[styles.fontWeight_700, styles.font_md, styles.marginBottom_xsm]}>Deliver To:</Text>
        <Text style={[styles.fontWeight_700, styles.color_gray, styles.font_sm]}>02113, 71, Charter str. Boston, MA, USA</Text>
      </View>
      <View style={[styles.slimBorderBottom, styles.paddingVertical_sm, styles.marginBottom_sm]}>
        <Text numberOfLines={1} style={[styles.fontWeight_700, styles.font_md, styles.marginBottom_xsm]}>Upon Arrival:</Text>
        <Text style={[styles.fontWeight_700, styles.color_gray, styles.font_sm]}>Go to fifth floor Apt #5r</Text>
      </View>
      <View style={[]}>
        <Text numberOfLines={1} style={[styles.fontWeight_700, styles.font_md, styles.marginBottom_xsm]}>Order Details:</Text>
        <View style={[styles.row, styles.alignItems_center, styles.justifyContent_between, styles.marginBottom_md]}>
          <Text style={[styles.fontWeight_700, styles.font_sm]}>{quantifier(4, 'item')}</Text>
          <View style={[styles.row, styles.alignItems_center]}>
            <Text style={[styles.fontWeight_700, styles.font_md, styles.marginRight_xsm]}>Subtotal:</Text>
            <Text style={[styles.fontWeight_700, styles.color1, styles.font_md]}>$44.54</Text>
          </View>
        </View>
        <View style={[styles.marginBottom_sm]}>
          <Item qty={1} item="Chocomocco" />
          <Item qty={2} item="Pastery Salad" />
          <Item qty={1} item="FooDoor Fries" />
          <Item qty={1} item="Chocomocco" />
          <Item qty={2} item="Pastery Salad" />
          <Item qty={1} item="FooDoor Fries" />
          <Item qty={1} item="Chocomocco" />
          <Item qty={2} item="Pastery Salad" />
          <Item qty={1} item="FooDoor Fries" />
          <Item qty={1} item="Chocomocco" />
          <Item qty={2} item="Pastery Salad" />
          <Item qty={1} item="FooDoor Fries" />
        </View>
        <ImageSlider images={[getImage(), getImage(), getImage()]} />
      </View>
    </ScrollView>
  )
}

const getImage = () => ({uri: 'https://res.cloudinary.com/dx5lp5drd/image/upload/v1586035953/igbo-abacha-ncha_oeiamp.jpg'})
const ImageSlider = ({images}) => {
  const slides = images.map(image => (
    <View style={[serviceStyle.imageSlider]} >
      <ImageBackground source={ image } style={[{flex: 1}, styles.slimBorder]} />
    </View>
  ))
  
  return (
    <View style={[styles.flexCenter]}>
      <ComponentCarousel slides={slides} autoSlide={false} bullet={true} dimensions={{width: '100%', height: 'auto'}}  />
    </View>
  )
}

const Item = ({qty, item}) => {
  return (
    <View style={[styles.row, styles.alignItems_center, styles.marginBottom_md]}>
      <Text style={[styles.color_gray, styles.font_sm, styles.marginRight_md]}>{qty}</Text>
      <Text style={[styles.color_gray, styles.font_sm, styles.capitalize]}>{item}</Text>
    </View>
  )
}

const serviceStyle = StyleSheet.create({
  mapContainer: {
    width: '100%',
  },
  modalDrawer: {
    width: 35,
    height: 35,
    ...styles.slimBorder,
    ...styles.border_r_5,
    transform: [{rotate: '45deg'}]
  },
  imageSlider: {
    width: Dimensions.get('screen').width - 80,
    height: 180,
    borderRadius: 5,
    overflow: 'hidden',
  }
})
export default ServiceDetail;
