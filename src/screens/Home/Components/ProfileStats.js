import React, { useMemo } from 'react';
import { FontAwesome5, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, Dimensions, Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect, useSelector } from 'react-redux';
import { createSelector } from 'reselect'
import { Button, Spinners } from '../../../components';
import { Section } from '../../Wrapper';
import { actions } from '../../../helpers';
import { styles, colors } from '../../styles';
import { useNavigation } from '@react-navigation/core';

const { useSpinner } = Spinners;
const { chefInfoActions: { getChefInfoRequest } } = actions;
const ProfileStats = React.memo(({ chefInfo, chefName }) => {
  const { Spinner, animating, setAnimating } = useSpinner()
  console.log(chefInfo)
  const {
    avatar_url, cookbook, fan, serves, wallet,
    restaurant_name, city, state, address,
  } = chefInfo;
  const { navigate } = useNavigation();
  // React.useEffect(() => {
  //   getChefInfoRequest(setAnimating)
  // },[getChefInfoRequest])
  return (
    <Section style={[{height: 150, transform: [{translateY: -30}] }]}>
      <View style={[styles.bg_white, styles.border_r_5, styles.boxShadowDark_sm, styles.padding_sm, {flex: 1}]}>
      {animating ? Spinner :
      <>
        <View style={[styles.row, styles.marginBottom_sm]}>
          <View style={[styles.avatar, styles.marginRight_sm, {overflow: 'hidden', transform: [{translateY: -styles.avatar.height / 2}]} ]}>
            <Image source={ avatar_url ? {uri: avatar_url} : require('../../../assets/avatar.jpg')} style={{width: '100%', overflow: 'hidden', flex: 1 }} />
          </View>
          <View style={[styles.marginRight_md, {flex: .5}]}>
            <Text numberOfLines={1} style={[styles.font_md, styles.fontWeight_700]}>{restaurant_name || chefName}</Text>
            <View style={[styles.row, styles.alignItems_center]}>
              <MaterialIcons name="location-on" color={colors.gray_color} size={16} style={[styles.marginRight_xsm]} />
              <Text numberOfLines={2} style={[styles.color_gray, styles.fontWeight_700, styles.font_xsm,]}>{address} {city} {state}</Text>
              {/* country flag*/}
            </View>
          </View>
          <View style={[styles.row, styles.alignItems_center, {height: 30, flex: .6}]}>
            <View style={[styles.marginRight_sm]}>
              <Button action={() =>  navigate('Settings', {screen: 'Settings'})}
                style={[styles.flexCenter, styles.bg_color1Opacity, {width: 25, height: 25, borderRadius: 12.5,}]}>
                <FontAwesome5 name="user-cog" size={10} color={colors.color1} />
              </Button>
            </View>
            <View style={[styles.bg_color1, styles.flexCenter, styles.border_r_10, { width: 100, height: 30 }]}>
              <Text style={[styles.color_white, styles.fontWeight_700]}>${wallet}</Text>
            </View>
          </View>
        </View>
        <View style={[styles.row, styles.justifyContent_between,]}>
          <Stats value={167} name="Foodprints" icon="feedback" iconLibrary={MaterialIcons} />
          <Stats value={cookbook} name="Dishes" icon="food-variant" iconLibrary={MaterialCommunityIcons} />
          <Stats value={serves} name="Serves" icon="silverware-fork-knife" iconLibrary={MaterialCommunityIcons} />
          <Stats value={fan} name="Fans" icon="users" iconLibrary={FontAwesome5} lastIndex={true} />
        </View>
        </>}
      </View>
    </Section>
  )
})

const Stats = ({value, icon, name, lastIndex, iconLibrary: IconLibrary}) => {
  return (
    <View style={[styles.flexCenter, styles.padding_sm, !lastIndex ? styles.borderRight : null, {overflow: 'hidden', width: Dimensions.get('window').width / 4 - 10}]}>
      <Text numberOfLines={1} style={[styles.fontWeight_700, styles.font_md, styles.marginBottom_xsm]}>{value ? value : 0}</Text>
      <View style={[styles.row, styles.alignItems_center]}>
        <IconLibrary name={icon} color={colors.gray_color} size={16} style={[styles.marginRight_xsm]} />
        <Text numberOfLines={1} style={[styles.color_gray, styles.fontWeight_700, styles.font_sm,]}>{name}</Text>
      </View>
    </View>
  )
}

const mapStateTopProps = store => {
  const { chefInfoReducer: chefInfo, userReducer: { first_name, last_name } } = store;
  return { chefInfo, chefName: `${first_name} ${last_name}` }
}
// const mapDispatchToProps = dispatch => 
//   bindActionCreators({ getChefInfoRequest }, dispatch);

export default connect(mapStateTopProps, null)(ProfileStats);
