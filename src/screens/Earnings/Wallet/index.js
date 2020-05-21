import * as React from 'react';
import { View, Text, ScrollView, Image } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import { Button, Utils } from '../../../components';
import { Screen, Section } from '../../Wrapper';
import { styles, colors } from '../../styles';
import { WalletDashboard } from '../Components'

const { NavigationIcons: { NotificationBell } } = Utils;
export default Wallet = ({navigation}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <NotificationBell style={[styles.marginRight_sm]} />,
      headerLeft: () => (
        <View style={[styles.marginLeft_sm]}>
          <Button action={() => navigation.openDrawer()} style={[styles.flexCenter, {height: 45, width: 45, borderRadius: 22.5}]}>
            <FontAwesome5 name="bars" size={16} />
          </Button>
        </View>
      )
    })
  })
  return (
    <Screen>
      <ScrollView>
        <View style={[styles.bg_color1, styles.paddingHorizontal_sm, styles.paddingTop_sm, styles.paddingBottom_md, styles.marginBottom_md, {borderBottomRightRadius: 30, borderBottomLeftRadius: 30}]}>
          
          <WalletDashboard navigate={navigation.navigate} />
        </View>
        <Section>
          <View style={[styles.marginBottom_md]}>
            <Text numberOfLines={1} style={[styles.font_md, styles.fontWeight_700, styles.marginBottom_sm, styles.capitalize,]}>last transaction</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Button style={[styles.avatar, styles.marginRight_sm]}>
                <Image source={require('../../../assets/avatar.jpg')}  style={{width: '100%', flex: 1}} />
              </Button>
              <Button style={[styles.avatar, styles.marginRight_sm]}>
                <Image source={require('../../../assets/avatar.jpg')}  style={{width: '100%', flex: 1}} />
              </Button>
              <Button style={[styles.avatar, styles.marginRight_sm]}>
                <Image source={require('../../../assets/avatar.jpg')}  style={{width: '100%', flex: 1}} />
              </Button>
              <Button style={[styles.avatar, styles.marginRight_sm]}>
                <Image source={require('../../../assets/avatar.jpg')}  style={{width: '100%', flex: 1}} />
              </Button>
            </ScrollView>
          </View>
          <View style={[styles.marginBottom_md]}>
            <Text numberOfLines={1} style={[styles.font_md, styles.fontWeight_700, styles.marginBottom_sm, styles.capitalize,]}>income</Text>
            <View style={[styles.row, styles.alignItems_center, styles.justifyContent_between, styles.bg_gray, styles.border_r_5, styles.paddingHorizontal_md, {height: 100}]}>
              <Text numberOfLines={1} style={[styles.font_xlg, styles.fontWeight_700, styles.capitalize, {color: colors.google_green}]}>+ $3,652.00</Text>
              <FontAwesome5 name="arrow-down" size={25} color={colors.google_green} />
            </View>
          </View>
          <View style={[styles.marginBottom_md]}>
            <Text numberOfLines={1} style={[styles.font_md, styles.fontWeight_700, styles.marginBottom_sm, styles.capitalize,]}>expense</Text>
            <View style={[styles.row, styles.alignItems_center, styles.justifyContent_between, styles.bg_gray, styles.border_r_5, styles.paddingHorizontal_md, {height: 100}]}>
              <Text numberOfLines={1} style={[styles.font_xlg, styles.fontWeight_700, styles.capitalize, {color: colors.danger}]}>- $3,652.00</Text>
              <FontAwesome5 name="arrow-up" size={25} color={colors.danger} />
            </View>
          </View>
        </Section>
      </ScrollView>
    </Screen>
  )
}