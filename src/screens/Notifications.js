import React from 'react';
import { View, Text, FlatList, Image, ImageBackground, ScrollView, Dimensions, StyleSheet, Animated } from 'react-native';
import { FontAwesome5, MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { Screen, Section } from './Wrapper';
import { styles, colors } from './styles';
import { Button, Utils, Modal, Carousels} from '../components'

const notifications = [
  {
    type: 'SERVICE_REQUEST',

  }
]

const Header = () => {
  return (
    <View style={[styles.alignItems_center, styles.justifyContent_end, styles.paddingBottom_sm, styles.bg_white, styles.boxShadow_sm, styles.slimBorderBottom, {height: 80}]}>
      <Text numberOfLines={1} style={[styles.font_lg, styles.fontWeight_700]}>Notifications</Text>
    </View>
  )
}

const Notifications = ({ navigation }) => {
  
  return (
    <Screen style={[styles.paddingTop_sm, styles.paddingHorizontal_sm, styles.paddingBottom_sm, styles.bg_white]}>
      <Header />
      <FlatList
        ListHeaderComponent={<Header />}
        data={chats}
        renderItem={({ item, index, separators }) =>
          <Notification navigateTo="IncomingRequest" navigate={navigation.navigate} notification={item} />}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={true}
      />
    </Screen>
  )
}

const Notification = ({notification, navigateTo}) => {
  const {  } = notification;
  return (
    <View style={[]}>
      <Button action={() => navigate(navigateTo)}
        style={[styles.paddingHorizontal_sm, styles.paddingTop_sm, styles.row]}>
        <View style={[styles.avatar_md, styles.marginRight_sm]}>
          <FontAwesome5 name="" size={16} color={colors.white} />
        </View>
        <View style={[styles.row, styles.nowrap, styles.justifyContent_between, styles.paddingBottom_sm, styles.slimBorderBottom, {flex: 1} ]}>
          <View style={[ {flex: 1} ]}>
            <Text numberOfLines={2} style={[styles.font_md, styles.fontWeight_700, {lineHeight: 23,}]}>{name}</Text>
            <Text numberOfLines={1} style={[styles.font_sm]}>{lastMessage}</Text>
          </View>
          <View style={[styles.alignItems_end]}>
            <Text style={[styles.color_gray, styles.font_xsm, styles.marginBottom_sm]}>{date}</Text>
            <View style={[styles.bg_color1, styles.flexCenter, {width: 20, height: 20, borderRadius: 10 }]}>
              <Text style={[styles.color_white, styles.fontWeight_700]}>5</Text>
            </View>
          </View>
        </View>
      </Button>
    </View>
  )
}
export default Notifications;
