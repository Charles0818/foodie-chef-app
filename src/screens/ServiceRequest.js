import React from 'react';
import { View, Text, Image, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { FontAwesome5, MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { Screen, Section } from './Wrapper';
import { styles, colors } from './styles';
import { Button, Utils, Modal} from '../components'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const { formatting: { quantifier } } = Utils;
const { useResizableDrawUpModal } = Modal;
const ServiceDetail = () => {
  const { Modal: RequestDetail } = useResizableDrawUpModal({ children: Detail, value: true })
  return (
    <Screen>
      <MapInterface />
      {RequestDetail}
    </Screen>
  )
}

const MapInterface = () => {
  return (
    <View style={[serviceStyle.mapContainer, styles.bg_color1]}>

    </View>
  )
}

const Detail = (props) => {
  const { modalControl: { expandModal, collapseModal, isCollapsed } } = props;
  return (
    <Section style={[styles.paddingHorizontal_md]}>
      <View style={[styles.flexCenter]}>
        <View style={[styles.avatar, styles.marginRight_sm, {overflow: 'hidden', borderStyle: 'dashed', transform: [{translateY: -styles.avatar.height / 2}]} ]}>
          <Image source={require('../assets/avatar.jpg')} style={{width: '100%', overflow: 'hidden', flex: 1 }} />
        </View>
      </View>
      <View style={[styles.row,  styles.justifyContent_between, styles.marginBottom_sm]}>
        <Button style={[styles.flexCenter, serviceStyle.modalDrawer]} action={isCollapsed ? expandModal : collapseModal}>
          <MaterialCommunityIcons name={isCollapsed ? "arrow-up-bold" : "arrow-down-bold"} size={25} color={colors.gray_color} style={{transform: [{rotate: '315deg'}]}} />
        </Button>
        <View style={[styles.flexCenter]}>
          <Text numberOfLines={1} style={[styles.font_sm, styles.color_gray, styles.fontWeight_700, styles.marginBottom_xsm]}>Your Customer</Text>
          <Text numberOfLines={1} style={[styles.font_md, styles.fontWeight_700, styles.marginBottom_xsm]}>Sabrina Lorenshtein</Text>
          <View style={[styles.row, styles.alignItems_center, styles.marginBottom_sm]}>
            <Text numberOfLines={1} style={[styles.font_xsm, styles.fontWeight_700, styles.marginRight_xsm]}>Invoice No.</Text>
            <Text numberOfLines={1} style={[styles.font_xsm, styles.color_gray, styles.fontWeight_700, styles.marginRight_xsm]}>30WT43GD546</Text>
            <Button style={[]}>
              <MaterialCommunityIcons name="file-pdf" size={20} color={colors.color2} />
            </Button>
          </View>
        </View>
        <Button style={[styles.flexCenter, serviceStyle.modalDrawer, {backgroundColor: !isCollapsed ? colors.google_green : colors.gray_color2 }]}>
          <MaterialCommunityIcons
            size={25} color={colors.white}
            name={isCollapsed ? "gesture-swipe-up" : "gesture-swipe-down"}
            style={{transform: [{rotate: '315deg'}]}}
          />
        </Button>
      </View>
      {isCollapsed ? (
      <View style={[styles.marginBottom_md]}>
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
      ) : null}
      {/*buttons*/}
      <Actions />
      <OrderDetails />
    </Section>
  )
}

const Actions = () => {
  return (
    <View style={[styles.marginBottom_md, styles.slimBorderBottom]}>
      <View style={[styles.row, styles.alignItems_center, styles.marginBottom_md]}>
        <View style={[styles.border_r_35, styles.marginRight_sm, {flex: 1, height: 40}]}>
          <Button style={[styles.border_r_35, styles.flexCenter, styles.slimBorder, {flex: 1}]}>
            <Ionicons name="ios-chatbubbles" size={20} color={colors.gray_color} />
          </Button>
        </View>
        <View style={[styles.border_r_35, styles.marginRight_sm, {flex: 1, height: 40}]}>
          <Button style={[styles.border_r_35, styles.flexCenter, styles.slimBorder, {flex: 1, backgroundColor: colors.google_green}]}>
            <Ionicons name="ios-call" size={20} color={colors.white} />
          </Button>
        </View>
      </View>
      <View style={[styles.border_r_35, styles.marginRight_sm, {flex: 1, height: 40}]}>
        <Button style={[styles.border_r_35, styles.bg_color1, styles.flexCenter, styles.slimBorder, {flex: 1}]}>
          <Text numberOfLines={1} style={[styles.font_sm, styles.color_white, styles.fontWeight_700,]}>Invoice No.</Text>
        </Button>
      </View>
    </View>
  )
}

const OrderDetails = () => {
  return (
    <ScrollView style={[]}>
      <View style={[styles.slimDottedBorder, styles.paddingVertical_sm]}>
        <Text numberOfLines={1} style={[styles.fontWeight_700, styles.font_md, styles.marginBottom_xsm]}>Deliver To:</Text>
        <Text style={[styles.fontWeight_700, styles.color_gray, styles.font_sm]}>02113, 71, Charter str. Boston, MA, USA</Text>
      </View>
      <View style={[styles.slimDottedBorder, styles.paddingVertical_sm]}>
        <Text numberOfLines={1} style={[styles.fontWeight_700, styles.font_md, styles.marginBottom_xsm]}>Upon Arrival:</Text>
        <Text style={[styles.fontWeight_700, styles.color_gray, styles.font_sm]}>Go to fifth floor Apt #5r</Text>
      </View>
      <View style={[styles.slimDottedBorder, styles.paddingVertical_sm]}>
        <Text numberOfLines={1} style={[styles.fontWeight_700, styles.font_md, styles.marginBottom_xsm]}>Order Details:</Text>
        <View style={[styles.row, styles.alignItems_center, styles.justifyContent_between, styles.marginBottom_md]}>
          <Text style={[styles.fontWeight_700, styles.font_sm]}>{quantifier(4, 'item')}</Text>
          <View style={[styles.row, styles.alignItems_center]}>
            <Text style={[styles.fontWeight_700, styles.font_md, styles.marginRight_xsm]}>Subtotal:</Text>
            <Text style={[styles.fontWeight_700, styles.color1, styles.font_md]}>$44.54</Text>
          </View>
        </View>
        <Item qty={1} item="Chocomocco" />
        <Item qty={2} item="Pastery Salad" />
        <Item qty={1} item="FooDoor Fries" />
        <Item qty={1} item="Chocomocco" />
        <Item qty={2} item="Pastery Salad" />
        <Item qty={1} item="FooDoor Fries" />
      </View>
    </ScrollView>
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
    height: Dimensions.get('window').height  * 0.7
  },
  modalDrawer: {
    width: 35,
    height: 35,
    ...styles.slimBorder,
    ...styles.border_r_5,
    transform: [{rotate: '45deg'}]
  }
})
export default ServiceDetail;
