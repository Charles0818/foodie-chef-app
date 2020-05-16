import * as React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, ImageBackground } from 'react-native'
import { FontAwesome5, AntDesign, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { Button, useToggleButton, FilePicker, Utils } from '../../components';
import { Screen, Section } from '../Wrapper';
import { styles, colors } from '../styles';
const { NavigationIcons: { GoBackButton } } = Utils;

const Header = () => {
  return (
    <View style={[styles.row, styles.alignItems_end, styles.justifyContent_between, styles.bg_white, styles.boxShadowGray_sm, {height: 80}]}>
      <View style={[styles.row, styles.alignItems_center, styles.justifyContent_between, styles.paddingHorizontal_sm]}>
        <GoBackButton />
        <View style={[{flex: 4}]}>
          <Text style={[,styles.fontWeight_700, styles.text_center, styles.font_md]}>Invite & Earn</Text>
        </View>
        <Button style={[styles.flexCenter, {width: 40, height: 40, borderRadius: 20, flex: .5}]}>
          <MaterialIcons name="help-outline" size={16} />
        </Button>
      </View>
    </View>
  )
}
const Invite = () => {
  return (
    <Screen>
      <Header />
      <Section style={[styles.marginTop_md, {flex: 1}]}>
        <View style={[styles.flexCenter, styles.marginBottom_md]}>
          <Text style={[styles.marginBottom_sm,styles.fontWeight_700, styles.font_md]}>Friend Stranded in a lockdown</Text>
          <Text style={[styles.fontWeight_700, styles.font_lg, styles.color1, styles.marginBottom_xsm]}>Help your friend and get rewarded!</Text>
        </View>
        <Illustrations />
        <View style={[styles.padding_md, styles.slimBorder, styles.border_r_5, styles.marginBottom_md, styles.bg_white,]}>
          <View style={[styles.row, {height: 50}]}>
            <Button style={[styles.flexCenter, styles.border_r_5, styles.marginRight_xsm, styles.bg_green, {flex: 1.5}]}>
              <View style={[styles.row, styles.alignItems_center,]}>
                <FontAwesome5 name="whatsapp" size={26} color={colors.white} style={[styles.marginRight_sm]} />
                <Text style={[styles.font_md, styles.fontWeight_700, styles.color_white,]}>Share via WhatsApp</Text>      
              </View>
            </Button>
            <Button style={[styles.flexCenter, styles.border_r_5, styles.slimBorder, {flex: .6}]}>
              <View style={[styles.row, styles.alignItems_center]}>
                <AntDesign name="sharealt" size={26}  style={[styles.marginRight_sm]} />
                <Text style={[styles.font_md, styles.fontWeight_700,]}>More</Text>      
              </View>
            </Button>
          </View>
        </View>
        <View style={[styles.slimBorder, styles.row, styles.alignItems_center, styles.justifyContent_between, ]}>
          <View style={[styles.row, styles.alignItems_center, styles.padding_md,]}>
            <FontAwesome5 name="medal" size={16} style={[styles.marginRight_sm]} />
            <Text style={[styles.font_md, styles.fontWeight_700,]}>Rewards you've won</Text>      
          </View>
          <Button style={[styles.padding_md, {flex: .3}]}>
            <Text style={[styles.font_md, styles.color1, styles.fontWeight_700,]}>View</Text>      
          </Button>
        </View>
        <ShareButton />
      </Section>
    </Screen>
  )
}

const Illustrations = () => {
  return (
    <View style={[styles.marginBottom_lg]}>
      <View style={[styles.row, styles.alignItems_center, styles.justifyContent_between, styles.marginBottom_sm, {height: 100}]}>
        <View style={{flex: 1}}>
          <Image source={require('../../assets/mobile_pay_9abj.png')} style={{width: '100%', flex: 1}} />
        </View>
        <View style={{flex: 1}}>
          <Image source={require('../../assets/messaging_uok8.png')}  style={{width: '100%', flex: 1}} />
        </View>
        <View style={{flex: 1}}>
          <Image source={require('../../assets/referral.png')} style={{width: '100%', flex: 1}} />
        </View>
      </View>
      <View style={[styles.row, styles.alignItems_center]}>
        <Text style={[styles.text_center, {flex: 1}]}>Share with your friends the Cuisingo app</Text>
        <FontAwesome5 name="arrow-right" size={20} color={colors.color1} />
        <Text style={[styles.text_center, {flex: 1}]}>Share with your friends the Cuisingo app</Text>
        <FontAwesome5 name="arrow-right" size={20} color={colors.color1} />
        <Text style={[styles.text_center, {flex: 1}]}>Share with your friends the Cuisingo app</Text>
      </View>
    </View>
  )
}

const ShareButton = () => {
  return (
    <View style={[styles.row, styles.alignItems_center, styles.justifyContent_between, styles.overflow_h, styles.bg_green, styles.border_r_35, styles.boxShadow_sm, {width: 100, height: 50, position: 'absolute', bottom: 10, right: 10}]}>
      <Button style={[styles.flexCenter, styles.padding_md, {flex: 1}]}>
        <FontAwesome5 name="whatsapp" size={20} color={colors.white} />
      </Button>
      <View style={[styles.slimBorder, {width: 2, height: 25}]}/>
      <Button style={[styles.flexCenter, styles.padding_md, {flex: 1}]}>
        <AntDesign name="sharealt" size={20} color={colors.white} />
      </Button>
    </View>
  )
}

export default Invite;
