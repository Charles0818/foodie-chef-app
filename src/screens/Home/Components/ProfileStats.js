import React from 'react';
import { FontAwesome5, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, Dimensions, Image } from 'react-native';
import { Button } from '../../../components';
import { Section } from '../../Wrapper';
import { styles, colors } from '../../styles';

const ProfileStats = () => {
  return (
    <Section style={[{transform: [{translateY: -30}] }]}>
      <View style={[styles.bg_white, styles.border_r_5, styles.boxShadowDark_sm, styles.padding_sm]}>
        <View style={[styles.row, styles.marginBottom_sm]}>
          <View style={[styles.avatar, styles.marginRight_sm, {overflow: 'hidden', transform: [{translateY: -styles.avatar.height / 2}]} ]}>
            <Image source={require('../../../assets/avatar.jpg')} style={{width: '100%', overflow: 'hidden', flex: 1 }} />
          </View>
          <View style={[styles.marginRight_md]}>
            <Text numberOfLines={1} style={[styles.font_md, styles.fontWeight_700]}>John Martins</Text>
            <View style={[styles.row, styles.alignItems_center]}>
              <MaterialIcons name="location-on" color={colors.gray_color} size={16} style={[styles.marginRight_xsm]} />
              <Text style={[styles.color_gray, styles.fontWeight_700, styles.font_xsm,]}>Salt lake city</Text>
              {/* country flag*/}
            </View>
          </View>
          <View style={[styles.row, styles.alignItems_center, {height: 30}]}>
            <View style={[styles.marginRight_sm]}>
              <Button action={() =>  pickImage()} style={[styles.flexCenter, styles.bg_color1Opacity, {width: 25, height: 25, borderRadius: 12.5,}]}
                action={() => console.log('Button clicked')}>
                <FontAwesome5 name="user-cog" size={10} color={colors.color1} />
              </Button>
            </View>
            <View style={[styles.bg_color1, styles.flexCenter, styles.border_r_10, { width: 100, height: 30 }]}>
              <Text style={[styles.color_white, styles.fontWeight_700]}>$1,456</Text>
            </View>
          </View>
        </View>
        <View style={[styles.row, styles.justifyContent_between,]}>
          <Stats value={167} name="Foodprint" icon="feedback" iconLibrary={MaterialIcons} />
          <Stats value={577} name="Dishes" icon="food-variant" iconLibrary={MaterialCommunityIcons} />
          <Stats value={209} name="Serves" icon="silverware-fork-knife" iconLibrary={MaterialCommunityIcons} />
          <Stats value={57} name="Fans" icon="users" iconLibrary={FontAwesome5} lastIndex={true} />
        </View>
      </View>
    </Section>
  )
}

const Stats = ({value, icon, name, lastIndex, iconLibrary: IconLibrary}) => {
  return (
    <View style={[styles.flexCenter, styles.padding_sm, !lastIndex ? styles.borderRight : null, {overflow: 'hidden', width: Dimensions.get('window').width / 4 - 10}]}>
      <Text numberOfLines={1} style={[styles.fontWeight_700, styles.font_md, styles.marginBottom_xsm]}>{value}</Text>
      <View style={[styles.row, styles.alignItems_center]}>
        <IconLibrary name={icon} color={colors.gray_color} size={16} style={[styles.marginRight_xsm]} />
        <Text numberOfLines={1} style={[styles.color_gray, styles.fontWeight_700, styles.font_sm,]}>{name}</Text>
      </View>
    </View>
  )
}

export default ProfileStats;
