import React, { memo } from 'react';
import { View, Text, FlatList, Image, ImageBackground, ScrollView, Dimensions, StyleSheet, Animated } from 'react-native';
import { FontAwesome5, MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { Screen, Section } from './Wrapper';
import { styles, colors } from './styles';
import { Button, Utils, Modal, Carousels, Form, Map} from '../components';

const { dataConstants: { bookingStatus }, formatting: { quantifier } } = Utils;
const bookings = [
  {
    name: 'Charles Willson',
    isNew: true,
    status: 'Pending',
    date: '11:15 PM',
    items: [
      {
        name: 'Poccossa',
        qty: 4,
      },
      {
        name: 'British Pizza',
        qty: 12,
      }
    ]
  },
  {
    name: 'Baby Dee',
    isNew: true,
    status: 'Pending',
    date: '10:45 AM',
    items: [
      {
        name: 'Poccossa',
        qty: 4,
      },
      {
        name: 'British Pizza',
        qty: 12,
      }
    ]
  },
  {
    name: 'Charles Willson',
    isNew: false,
    status: 'Delivered',
    date: 'Mon',
    items: [
      {
        name: 'Poccossa',
        qty: 4,
      },
      {
        name: 'British Pizza',
        qty: 12,
      }
    ]
  },
  {
    name: 'Hiliary Clington',
    isNew: false,
    status: 'Progress',
    date: 'Mon',
    items: [
      {
        name: 'Poccossa',
        qty: 4,
      },
      {
        name: 'British Pizza',
        qty: 12,
      }
    ]
  },
  {
    name: 'Chucks Obinna',
    isNew: false,
    status: 'Progress',
    date: 'Mon',
    items: [
      {
        name: 'Poccossa',
        qty: 4,
      },
      {
        name: 'British Pizza',
        qty: 12,
      }
    ]
  },
  {
    name: 'Charles Willson',
    isNew: false,
    status: 'Pending',
    date: 'June 12',
    items: [
      {
        name: 'Poccossa',
        qty: 4,
      },
      {
        name: 'British Pizza',
        qty: 12,
      }
    ]
  },
  {
    name: 'Iyobosa Evbayowieru',
    isNew: false,
    status: 'Cancelled',
    date: 'June 12',
    items: [
      {
        name: 'Poccossa',
        qty: 4,
      },
      {
        name: 'British Pizza',
        qty: 12,
      }
    ]
  }
]

const Header = () => {
  return (
    <View style={[styles.alignItems_center, styles.justifyContent_end, styles.paddingBottom_sm, styles.bg_white, styles.boxShadow_sm, styles.slimBorderBottom, {height: 80}]}>
      <Text numberOfLines={1} style={[styles.font_lg, styles.fontWeight_700]}>Bookings</Text>
    </View>
  )
}
const Bookings = ({ navigation }) => {
  return (
    <Screen style={[styles.paddingTop_sm, styles.paddingHorizontal_sm, styles.paddingBottom_sm, styles.bg_white]}>
      <Header />
      <FlatList
        data={bookings}
        ListHeaderComponent={() =>(
        <View style={[styles.row, styles.alignItems_center, styles.marginBottom_sm, styles.marginTop_sm, styles.paddingHorizontal_sm]}>
          {bookingStatus.map((el, key) => (
             <View key={key} style={[styles.marginRight_xsm, styles.padding_sm, styles.border_r_5, {backgroundColor: el.color }]}>
              <Text style={[styles.color_white, styles.font_sm]}>{el.name}</Text>
            </View>
          ))}
        </View>
      )}
        renderItem={({ item, index, separators }) => <Booking key={index} push={navigation.push} booking={item} />}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        initialNumToRender={30}
      />
    </Screen>
  )
}

const Booking = ({booking, push}) => {
  let { name, isNew, status, id, items, date } = booking;
  status = bookingStatus.find(el => el.name === status);
  return (
    <View style={[]}>
      <Button action={() => push('ServiceRequest', { booking })}
        style={[styles.paddingHorizontal_sm, styles.paddingTop_sm, styles.row]}>
        <View
          style={[styles.marginRight_sm, styles.flexCenter, { width: 45, height: 45, borderRadius: 22.5, backgroundColor: status.color }]}>
          <Text style={[styles.font_lg, styles.fontWeight_700, styles.color_white]}>{status.name.slice(0, 1)}</Text>
        </View>
        <View style={[styles.row, styles.nowrap, styles.justifyContent_between, styles.paddingBottom_sm, styles.slimBorderBottom, {flex: 1} ]}>
          <View style={[ {flex: 1} ]}>
            <Text numberOfLines={1} style={[styles.font_md, styles.fontWeight_700, {lineHeight: 23,}]}>{name}</Text>
            <Text numberOfLines={1} style={[styles.font_sm, styles.color_gray]}>
              {items.map(item => `${quantifier(item.qty, item.name)}, `)}
            </Text>
          </View>
          <View style={[styles.alignItems_end]}>
            <Text style={[styles.color_gray, styles.font_xsm, styles.marginBottom_sm]}>{date}</Text>
            {isNew ?
            <View style={[styles.bg_color1, styles.flexCenter, styles.border_r_5,{width: 50, height: 20, }]}>
              <Text style={[styles.color_white, styles.fontWeight_700]}>{'new'}</Text>
            </View> : null }
          </View>
        </View>
      </Button>
    </View>
  )
}

export default Bookings;