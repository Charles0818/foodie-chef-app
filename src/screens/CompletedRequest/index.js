import * as React from 'react';
import { View, Text, Dimensions, ImageBackground, Image, StyleSheet, ScrollView } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import { Screen, Section } from '../Wrapper';
import { styles, colors } from '../styles';
import { Button, Utils } from '../../components';

const { dataConstants: { bookingStatusUpdates } } = Utils;
export default CompletedRequest = () => {
  return (
    <Screen style={[]}>
      <ScrollView>
        <Header />
        <Profile />
        <StatusUpdates />
      </ScrollView>
    </Screen>
  )
}

const Header = () => {
  return (
    <Section style={[requestStyles.header]}>
      <ImageBackground style={[requestStyles.thumbnail, styles.marginBottom_sm]} source={require('../../assets/nigerian-abacha-african-salad-5-ingredients.jpg')} resizeMethod="scale" />
      <View style={[]}>
        <View style={[styles.row, styles.alignItems_center]}>
          <View style={{flex: 1}}>
            <Text style={[styles.font_lg, styles.fontWeight_700, styles.text_center, styles.marginBottom_sm]}>Braised Leeks with Mozzarella & a Fried Egg</Text>
          </View>
          <View style={{flex: .1}}>
            <FontAwesome5 name="info-circle" size={20}/>
          </View>
        </View>
        <View style={[styles.row, styles.flexCenter]}>
          <Button style={[styles.padding_md, styles.border_r_5, styles.boxShadowGray, styles.marginRight_sm, styles.bg_color2]}>
            <Text style={[styles.fontWeight_700, styles.font_sm, styles.color_white]}>2 servings</Text>
          </Button>
          <Button style={[styles.padding_md, styles.border_r_5, styles.boxShadowGray, styles.marginRight_sm, styles.bg_color2]}>
            <Text style={[styles.fontWeight_700, styles.font_sm, styles.color_white]}>Extra sauce</Text>
          </Button>
        </View>
      </View>
    </Section>
  )
}

const Profile = () => {
  return (
    <Section style={[styles.row, styles.justifyContent_between]}>
      <View style={[styles.row]}>
        <View style={[styles.avatar, styles.marginRight_sm]}>
          <Image source={require('../../assets/avatar.jpg')} style={{width: '100%', flex: 1}} />
        </View>
        <View>
          <Text numberOfLines={1} style={[styles.font_lg, styles.fontWeight_700]}>John Doe</Text>
          <View style={[ styles.flexCenter, {backgroundColor: colors.google_green}]}>
            <Text style={[styles.font_sm, styles.fontWeight_700, styles.color_white,]}>Availaibe</Text>
          </View>
          <Text numberOfLines={1} style={[styles.font_xsm, styles.fontWeight_700, styles.color_gray]}>Last dish ordered</Text>
        </View>
      </View>
      <View style={[styles.justifyContent_between]}>
        <View style={[styles.flexCenter, styles.bg_color2, styles.paddingHorizontal_sm]}>
          <Text style={[styles.font_md, styles.color_white]}>4.7</Text>
        </View>
        <FontAwesome5 name="tag" size={20} color={colors.google_green} style={{transform: [{rotate: '45deg'}]}}/>
      </View>
    </Section>
  )
}

const StatusUpdates = ({statuses}) => {
  return (
    <Section>
      <Text style={[styles.font_lg, styles.fontWeight_700, styles.marginBottom_sm, styles.capitalize]}>Status updates</Text>
      {bookingStatusUpdates.map(status => (
        <Status status={status} />
      ))}
    </Section>
  )
}

const Status = ({status}) => {
  const { name, description, tick } = status;
  const statusColor = tick ? colors.google_green : colors.gray_color2;
  return (
      <View style={[styles.row, styles.marginBottom_xsm]}>
        <View style={[styles.alignItems_center ,styles.marginRight_sm]}>
          <View style={[styles.bg_green, styles.flexCenter, styles.marginBottom_xsm, {backgroundColor: statusColor ,width: 20, height: 20, borderRadius: 10}]}>
            {tick && <FontAwesome5 name="check" size={10} color={colors.white} /> }
          </View>
          <View style={[styles.bg_green, {backgroundColor: statusColor, width: 2, height: 40}]}/>
        </View>
        <View style={{flex: 1}}>
          <View style={[styles.row, styles.nowrap, styles.alignItems_center, styles.justifyContent_between]}>
            <Text numberOfLines={1} style={[styles.fontWeight_700, styles.font_lg, {color: colors.google_green}]}>{name}</Text>
            <Text numberOfLines={1} style={[styles.font_xsm, styles.fontWeight_700, styles.color_gray]}>Wed, Jun 22, 2020, 2:26 PM </Text>
          </View>
          <Text style={[styles.font_sm]}>{description}</Text>
        </View>
      </View>
  )
}
const requestStyles = StyleSheet.create({
  header: {
    width: '100%'
  },
  thumbnail: {
    flex: 1,
    height: 200,
  }
})