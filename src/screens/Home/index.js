import React, { useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect, useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Cards, Carousels, Button, useToggleButton, Spinners } from '../../components';
import { Screen, Section, NetworkInfo } from '../Wrapper';
import { styles, colors } from '../styles';
import { useNavigation } from '@react-navigation/core';
import { CoverPhoto, ProfileStats, Header, BookingTabs } from './Components';
import { actions, ajax } from '../../helpers';
import useNetworkError from '../NetworkError';
const { SquareServiceCard, ListServiceCard } = Cards;
const { useAjaxStatus } = ajax;
const { ComponentCarousel } = Carousels;
const { useSpinner } = Spinners;
const { homeActions: { getBookingAndChefInfo }, chefInfoActions: { chefInfoPartialUpdateRequest } } = actions;

const Home = React.memo(({navigation, getData}) => {
  const { Spinner, setAnimating, animating } = useSpinner(true);
  const { AjaxStatus, setAjaxStatus } = useAjaxStatus();
  const dispatch = React.useCallback(
    () => getData(setAnimating, setDisplayErrorScreen),
  []);
  const {
    NetworkErrorScreen, displayErrorScreen, setDisplayErrorScreen
  } = useNetworkError(dispatch);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      drawerLockMode: 'locked-closed',
    })
  })
  React.useEffect(() => {
    let isSubscribed = true;
    console.log('effect ran')
    dispatch();
    return () => isSubscribed = false;
  }, []);
  if(animating) return Spinner;
  if(displayErrorScreen) return NetworkErrorScreen
  return (
      <Screen>
        <Header />
        <NetworkInfo>
          <ScrollView>
            <CoverPhoto />
            <ProfileStats />
            <AcceptingRequest setAjaxStatus={setAjaxStatus} />
            <BookingTabs />
          </ScrollView>
        </NetworkInfo>
        <AjaxStatus />
      </Screen>
  )
})
const mapActiveToProps = state => {
  return { active: state.chefInfoReducer.active }
}
const mapIsActiveUpdate = dispatch => 
  bindActionCreators({ updateIsActive: chefInfoPartialUpdateRequest }, dispatch)
const AcceptingRequest = connect( mapActiveToProps, mapIsActiveUpdate )(({active, updateIsActive, setAjaxStatus}) => {
  // const { AjaxStatus, setAjaxStatus } = useAjaxStatus();
  console.log('rendered and active is', active)
  const toggleCallback = 
    (active) => updateIsActive({ active }, () => {}, setAjaxStatus, )
  const { ToggleButton, isActive } = useToggleButton(active, toggleCallback);
  console.log('isActive', isActive)
  return (
    <Section style={[styles.row, styles.justifyContent_between, styles.alignItems_center]}>
      <View style={[]}>
        <Text numberOfLines={1} style={[styles.fontWeight_700, styles.font_lg,]}>Accepting request</Text>
        <Text numberOfLines={1} style={[styles.fontWeight_700, styles.color_gray, styles.font_sm,]}>
         {isActive ? 'Active' : 'Not active'} in accepting request on my cookbook
         </Text>
      </View>
      {ToggleButton}
     
    </Section>
  )
})

const Recent = () => {
  return (
   <CategorizeServices />
  )
}

const UpcomingServices = () => {
  const navigation = useNavigation()
  return (
    <Section>
      <ListServiceCard navigation={navigation} />
      <ListServiceCard navigation={navigation} />
      <ListServiceCard navigation={navigation} />
      <ListServiceCard navigation={navigation} />
      <ListServiceCard navigation={navigation} />
    </Section>
  )
}

const HistoryRequests = () => {
  const navigation = useNavigation()
  return (
    <Section>
      <ListServiceCard navigation={navigation} />
      <ListServiceCard navigation={navigation} />
      <ListServiceCard navigation={navigation} />
      <ListServiceCard navigation={navigation} />
      <ListServiceCard navigation={navigation} />
    </Section>
  )
}
const Tabs = () => {
  const screens = [
    {
      tabTitle: "Recent",
      component: <Recent />
    },
    {
      tabTitle: "Upcoming",
      component: <UpcomingServices />
    },
    {
      tabTitle: "History",
      component: <HistoryRequests />
    },
  ]
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <Section>
      <View style={[styles.row, styles.overflow_h, styles.marginBottom_md, styles.border_r_35, styles.bg_gray, {height: 50, width: '100%'}]} >
        {screens.map((screen, index) => {
          const { tabTitle } = screen;
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
      {screens.map((screen, index) => {
        const {component: Component} = screen;
        return index === activeIndex && <ScrollView style={{flex: 1,}} key={index}>{Component}</ScrollView>
      })}
    </Section> 
  );
}

const CategorizeServices = () => {
  const { Spinner, setAnimating, animating } = useSpinner(true)
  React.useEffect(() => {
    setAnimating(false)
  }, []);
  const navigation = useNavigation();
  const Services = [
    <SquareServiceCard navigation={navigation} />,
    <SquareServiceCard navigation={navigation} />,
    <SquareServiceCard navigation={navigation} />,
    <SquareServiceCard navigation={navigation} />
  ];
  if(animating) return Spinner
  return (
    <Section style={[]}>
      <ComponentCarousel slides={Services} bullet={false} autoSlide={false} dimensions={{width: '100%', height: 'auto'}} />
    </Section>
  )
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getData: getBookingAndChefInfo }, dispatch)

export default connect(null, mapDispatchToProps)(Home);