import React from 'react';
import { View, Text, Image, FlatList, ScrollView, Dimensions, StyleSheet, Animated } from 'react-native';
import { FontAwesome5, MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { Screen, Section } from '../Wrapper';
import { styles, colors } from '../styles';
import { Button, Utils, Modal, Carousels, NavigationBars} from '../../components';

const chats = [
  {
    id: 1,
    name: 'Charles Wilsion',
    lastMessage: 'Are you there?',
    date: '10:45 PM',
    lastSeen: 'Thur, 04:30 PM',
    isActive: false,
  },
  {
    id: 2,
    name: 'Elina Johnson',
    lastMessage: 'Nice one James, your pizza was great!!!',
    date: 'Mon',
    lastSeen: 'Thur, 04:30 PM',
    isActive: true,
  },
  {
    id: 3,
    name: 'James Watt',
    lastMessage: 'Hi there, this is James from BIW catering enterprise ',
    date: 'Wed',
    lastSeen: 'Thur, 04:30 PM',
    isActive: false,
  },
  {
    id: 4,
    name: 'Alibaba Denison',
    lastMessage: 'Are you there?',
    date: 'June 27',
    lastSeen: 'Thur, 04:30 PM',
    isActive: true,
  }
];

const Header = () => {
  return (
    <View style={[styles.alignItems_center, styles.justifyContent_end, styles.paddingBottom_sm, styles.bg_white, styles.boxShadow_sm, styles.slimBorderBottom, {height: 80}]}>
      <Text numberOfLines={1} style={[styles.font_lg, styles.fontWeight_700]}>Chats</Text>
    </View>
  )
}

const Chats = ({ navigation }) => {
  return (
    <Screen style={[styles.paddingTop_sm, styles.paddingHorizontal_sm, styles.paddingBottom_sm, styles.bg_white]}>
      <Header />
      <FlatList
        data={chats}
        renderItem={({ item, index, separators }) => <ChatList key={index} push={navigation.push} chat={item} />}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        initialNumToRender={30}
      />
    </Screen>
  )
}

const ChatList = ({chat, push}) => {
  const { name, lastMessage, date, id, lastSeen, isActive } = chat;
  return (
    <View style={[]}>
      <Button action={() => push('Chat', { chatId: id, username: name, lastSeen, isActive })}
        style={[styles.paddingHorizontal_sm, styles.paddingTop_sm, styles.row]}>
        <View style={[styles.avatar_md, styles.marginRight_sm]}>
          <Image source={require('../../assets/avatar.jpg')} style={{flex: 1, width: '100%'}} />
        </View>
        <View style={[styles.row, styles.nowrap, styles.justifyContent_between, styles.paddingBottom_sm, styles.slimBorderBottom, {flex: 1} ]}>
          <View style={[ {flex: 1} ]}>
            <Text numberOfLines={1} style={[styles.font_md, styles.fontWeight_700, {lineHeight: 23,}]}>{name}</Text>
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

export default Chats;
