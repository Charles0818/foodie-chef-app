import * as React from 'react';
import { View, Text, Image } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import { Button, Utils } from '../../../components';
import { Section } from '../../Wrapper';
import { styles, colors } from '../../styles';

const WalletDashboard = ({navigate}) => {
  return (
    <View style={[styles.border_r_10, styles.bg_white, {height: 250}]}>
      <Section style={[styles.justifyContent_between, {flex: 1}]}>
        <View style={[styles.row, styles.alignItems_center, styles.paddingTop_sm,]}>
          <View style={[styles.avatar_md, styles.marginRight_sm]}>
            <Image source={require('../../../assets/avatar.jpg')} style={[{flex: 1, width: '100%'}]} />
          </View>
          <Text numberOfLines={2} style={[styles.font_lg, styles.fontWeight_700, styles.color_gray]}>Welcome, Iyobosa Evbayowieru</Text>
        </View>
        <View style={[styles.row, styles.justifyContent_between, styles.alignItems_center]}>
          <Text numberOfLines={1} style={[styles.font_md, styles.fontWeight_700, styles.color_gray, styles.uppercase, styles.marginRight_sm]}>total balance</Text>
          <Text numberOfLines={1} style={[styles.font_xlg, styles.fontWeight_700]}>$2258.00</Text>
        </View>
      </Section>
      <Button action={() => navigate('Transactions')}
        style={[styles.flexCenter, styles.justifyContent_end, styles.paddingVertical_sm, {backgroundColor: colors.color1_opacity}]}>
        <View style={[styles.row, styles.alignItems_center]}>
          <Text numberOfLines={1} style={[styles.font_md, styles.capitalize, styles.fontWeight_700, styles.color1, styles.marginRight_sm]}>all transactions</Text>
          <FontAwesome5 name="arrow-right" size={16} color={colors.color1} />
        </View>
      </Button>
    </View>
  )
}

export default WalletDashboard;
