import React from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import { Screen } from '../Wrapper';
import { styles } from '../styles';
import { Utils, Cards} from '../../components';

const { dataConstants: { bookingStatus }, NavigationIcons: {  NotificationBell } } = Utils;
const { BookingCard } = Cards;
const bookings = [
  {
    name: 'Charles Willson',
    isNew: true,
    status: 'Pending',
    duration: {
      start: '11:15 PM',
      end: '1:45 PM',
    },
    subtotal: 1120.00,
    address: '23, Queen Street, NSW, Asian, Thai',
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
    duration: {
      start: '10:45 AM',
      end: '1:45 PM',
    },
    subtotal: 1120.00,
    address: '23, Queen Street, NSW, Asian, Thai',
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
    duration: {
      start: 'Mon',
      end: '1:45 PM',
    },
    subtotal: 1120.00,
    address: '88, Dawnson Street, Hillsong Th., Asian, Thai',
    items: [
      {
        name: 'Chips',
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
    duration: {
      start: 'Mon',
      end: '1:45 PM',
    },
    subtotal: 1120.00,
    address: '23, Queen Street, NSW, Asian, Thai',
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
    duration: {
      start: 'Mon',
      end: '1:45 PM',
    },
    subtotal: 1120.00,
    address: '23, Queen Street, NSW, Asian, Thai',
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
    duration: {
      start: 'June 12',
      end: '1:45 PM',
    },
    subtotal: 1120.00,
    address: '23, Queen Street, NSW, Asian, Thai',
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
    duration: {
      start: 'June 12',
      end: '1:45 PM',
    },
    subtotal: 1120.00,
    address: '23, Queen Street, NSW, Asian, Thai',
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
    <View style={[styles.bg_color1, styles.justifyContent_end, styles.paddingBottom_sm, styles.bg_white, styles.boxShadow_sm, styles.slimBorderBottom, {height: 80, width: Dimensions.get('window').width}]}>
      <View style={[styles.row, styles.alignItems_center, styles.justifyContent_between, ]}>
        <View style={[{flex: 3.5}]}>
          <Text numberOfLines={1} style={[styles.font_lg, styles.text_center, styles.fontWeight_700]}>Bookings</Text>
        </View>
        <View style={[{flex: .5}]}>
          <NotificationBell />
        </View>
      </View>
    </View>
  )
}
const Bookings = ({ navigation }) => {
  return (
    <Screen style={[styles.paddingTop_sm,  styles.paddingBottom_sm, styles.bg_white]}>
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
        renderItem={({ item, index, separators }) => <BookingCard key={index} booking={item} />}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        initialNumToRender={30}
        contentContainerStyle={[styles.flexCenter, {width: Dimensions.get('window').width}]}
      />
    </Screen>
  )
}

export default Bookings;