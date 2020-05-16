import * as React from 'react';
import { View, Text, Image } from 'react-native'
import { Button } from '../../../components';
import { styles, colors } from '../../styles';

const TransactionCard = ({navigate}) => {
  return (
    <View style={[styles.marginBottom_sm]}>
      <Button action={() => navigate('ServiceRequest')} style={[styles.row, styles.alignItems_center, styles.justifyContent_between, styles.bg_gray, styles.border_r_5, styles.paddingHorizontal_sm, {height: 100}]}>
        <View style={[styles.row, styles.alignItems_center, {flex: 1.2}]}>
          <View style={[styles.avatar_md, styles.marginRight_sm]}>
            <Image source={require('../../../assets/avatar.jpg')} style={{width: '100%', flex: 1}} />
          </View>
          <View style={[{flex: 1}]}>
            <Text numberOfLines={1} style={[styles.font_md, styles.fontWeight_700, styles.marginBottom_xsm, styles.capitalize]}>Iyobosa Aghedo Evbayowieru</Text>
            <Text numberOfLines={1} style={[styles.font_sm, styles.fontWeight_700, styles.color_gray]}>15 Feb</Text>
          </View>
        </View>
        <View style={[styles.alignItems_end, {flex: .8}]}>
          <Text numberOfLines={1} style={[styles.font_lg, styles.fontWeight_700, {color: colors.google_green}]}>+ $334,652.00</Text>
        </View>
      </Button>
    </View>
  )
}

export default TransactionCard;
