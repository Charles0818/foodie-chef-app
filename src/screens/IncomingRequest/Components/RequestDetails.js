import React from 'react';
import { View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Section } from '../../Wrapper';
import { styles, colors } from '../../styles';
import { Button, Utils } from '../../../components';
const { formatting: { dateTimeFormat_12hr, quantifier } } = Utils;
const RequestDetails = ({declineRequest, closeModal}) => {
  const { navigate } = useNavigation();
  const accept = () => {
    closeModal();
    navigate('ServiceRequest')
  }
  return (
    <Section style={[styles.paddingHorizontal_md]}>
      <View style={[styles.flexCenter]}>
        <View style={[styles.avatar, styles.marginRight_sm, {overflow: 'hidden', borderStyle: 'dashed', transform: [{translateY: -styles.avatar.height / 2}]} ]}>
          <Image source={require('../../../assets/avatar.jpg')} style={{width: '100%', overflow: 'hidden', flex: 1 }} />
        </View>
      </View>
      <View style={[styles.paddingBottom_sm, styles.slimBorderBottom]}>
        <View style={[styles.row, styles.justifyContent_between, styles.alignItems_center]}>
          <Text numberOfLines={1} style={[styles.font_xsm, styles.color_gray, styles.fontWeight_700]}>Deliver by {dateTimeFormat_12hr()}</Text>
          <Text numberOfLines={1} style={[styles.font_xsm, styles.color_gray, styles.fontWeight_700]}>{quantifier(4, 'item')}</Text>
        </View>
        <View style={[styles.row, styles.justifyContent_between, styles.alignItems_center]}>
          <Text numberOfLines={1} style={[styles.font_md, styles.fontWeight_700]}>Monicas' Trattoria</Text>
          <Text numberOfLines={1} style={[styles.font_xsm, styles.color_gray, styles.fontWeight_700]}>{'5.3 mi total'}</Text>
        </View>
      </View>
      <View style={[styles.paddingVertical_sm, styles.flexCenter]}>
        <Text numberOfLines={1} style={[styles.font_md, styles.fontWeight_700, styles.marginBottom_sm]}>$7.22</Text>
        <Text numberOfLines={1} style={[styles.font_md, styles.fontWeight_700, styles.marginBottom_sm]}>Guaranteed including tips</Text>
      </View>
      <View style={[styles.row]}>
        <View style={[styles.marginRight_sm, {flex: 1, height: 50}]}>
          <Button action={accept}
            style={[styles.flexCenter, styles.bg_color3, styles.border_r_5, {flex: 1}]}>
            <Text numberOfLines={1} style={[styles.font_md, styles.color_white, styles.uppercase]}>accept</Text>
          </Button>
        </View>
        <View style={[{flex: 1, height: 50}]}>
          <Button action={declineRequest} style={[styles.flexCenter, styles.bg_danger, styles.border_r_5, {flex: 1}]}>
            <Text numberOfLines={1} style={[styles.font_md, styles.color_white, styles.uppercase]}>decline</Text>
          </Button>
        </View>
      </View>
    </Section>
  )
}

export default RequestDetails;
