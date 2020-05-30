import React, { useCallback, memo } from 'react';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, ScrollView, Dimensions, ImageBackground } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect, useSelector, shallowEqual } from 'react-redux';
import { Button, Modal, FilePicker, Spinners, Cards } from '../../../components';
import { actions, ajax } from '../../../helpers';
import { styles, colors } from '../../styles';
import { Screen, Section } from '../../Wrapper'
const { SquareServiceCard, ListServiceCard, BookingCard } = Cards;
const { useAjaxStatus } = ajax;
const { useSpinner } = Spinners;

const BookingTabs = React.memo(({ newBookings, accepted, ongoing }) => {
  const tabs = [
    {
      tabTitle: "New",
      component: <NewBookings newBookings={newBookings} />
    },
    {
      tabTitle: "Accepted",
      component: <AcceptedBookings accepted={accepted} />
    },
    {
      tabTitle: "Ongoing",
      component: <OngoingBookings ongoing={ongoing} />
    },
  ]
  const [activeIndex, setActiveIndex] = React.useState(0);
  return (
    <Section>
      <View style={[styles.row, styles.overflow_h, styles.marginBottom_md, styles.border_r_35, styles.bg_gray, {height: 50, width: '100%'}]} >
        {tabs.map((tab, index) => {
          const { tabTitle } = tab;
          const isActive = index === activeIndex
          return (
            <View key={index} style={[styles.border_r_35, styles.overflow_h, {flex: 1 }]}>
              <Button action={() => setActiveIndex(index)}
                style={[styles.flexCenter, styles.border_r_35, isActive ? styles.bg_color1 : null, {flex: 1}]}>
                <Text numberOfLines={1}
                  style={[styles.font_md, styles.fontWeight_700, isActive ? styles.color_white : styles.color_gray ]}>{tabTitle}</Text>
              </Button>
            </View>
          )
        })}
      </View>
      {tabs.map((tab, index) => {
        const {component: Component} = tab;
        return index === activeIndex && <ScrollView style={{flex: 1,}} key={index}>{Component}</ScrollView>
      })}
    </Section> 
  )
})


const NewBookings = memo(({ newBookings }) => {
  return (
    <Section>
      {newBookings.length !== 0
        ? newBookings.map(booking => <BookingCard booking={booking} />)
        : <DisplayIfEmpty tabName="You have no new request" />}
    </Section>
  )
})

const AcceptedBookings = memo(({ accepted }) => {
  return (
    <Section>
      {accepted.length !== 0
        ? accepted.map(booking => <BookingCard booking={booking} />)
        : <DisplayIfEmpty tabName="You have not accepted any request" />}
    </Section>
  )
})

const OngoingBookings = memo(({ ongoing }) => {
  return (
    <Section>
      {ongoing.length !== 0
        ? ongoing.map(booking =><BookingCard booking={booking} />)
        : <DisplayIfEmpty tabName="You have no Ongoing request" />}
    </Section>
  )
})

const DisplayIfEmpty = ({tabName}) => {
  return (
    <View style={[styles.flexCenter]}>
      <MaterialCommunityIcons name="food" size={54} color={colors.color1} style={[styles.marginBottom_sm]} />
      <Text style={[styles.fontWeight_700, styles.capitalize, styles.font_lg, styles.text_center, styles.text]}>{tabName}</Text>
    </View>
  )
}
const mapBannerToProps = state => {
  const bookings = state.bookingReducer
  const newBookings = bookings.filter(booking => booking.status === 'new');
  const accepted = bookings.filter(booking => booking.status === 'accepted');
  const ongoing = bookings.filter(booking => booking.status === 'ongoing')
  return { newBookings, accepted, ongoing }
}

export default connect(mapBannerToProps, null)(BookingTabs);