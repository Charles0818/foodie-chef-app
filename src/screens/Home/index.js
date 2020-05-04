import React from 'react';
import { FontAwesome5, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, ScrollView, Dimensions, ImageBackground, Image, StatusBar, StyleSheet } from 'react-native';
import { Cards, Carousels, Button, useToggleButton, Modal, FilePicker, Spinners } from '../../components';
import { Screen, Section } from '../Wrapper';
import { styles, colors } from '../styles';
import { useNavigation } from '@react-navigation/core';

const { SquareServiceCard, ListServiceCard } = Cards;
const { ComponentCarousel } = Carousels;
const { useSpinner } = Spinners;
const { useDrawUpModal } = Modal;

const Home = ({navigation}) => {
  const { Spinner, setAnimating, animating } = useSpinner(true);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      drawerLockMode: 'locked-closed',
    })
  })
  React.useEffect(() => {
    setAnimating(false)
  }, []);
  if(animating) return Spinner;
  return (
    <Screen>
      {/* <StatusBar barStyle="light-content"/> */}
      <ScrollView>
        <Header navigation={navigation} />
        <ProfileStats />
        <NotificationToggle />
        <Tabs />
      </ScrollView>
    </Screen>
  )
}

const Header = ({navigation}) => {
  const { image, pickImage, accessCamera } = FilePicker.ImageUpload();

  const ImageSelectOptions = () => {
    return (
      <View style={[styles.row]}>
        <View style={[styles.marginRight_lg]}>
          <Button action={() => {
             pickImage();
             closeModal
             }}
            style={[styles.alignItems_center]}>
            <MaterialIcons name="photo" color={colors.color1} size={30} style={[styles.marginBottom_sm]} />
            <Text numberOfLines={1} style={[styles.font_md, styles.fontWeight_700]}>Gallery</Text>
          </Button>
        </View>
        <View>
          <Button action={() => {
              accessCamera();
              closeModal
            }}
            style={[styles.alignItems_center]}>
            <FontAwesome5 name="camera-retro" color={colors.color1} size={30} style={[styles.marginBottom_sm]} />
            <Text numberOfLines={1} style={[styles.font_md, styles.fontWeight_700]}>Camera</Text>
          </Button>
        </View>
      </View>
    )
  }

  const { Modal, openModal, closeModal } = useDrawUpModal(<ImageSelectOptions />);

  return (
      <View style={{width: Dimensions.get('window').width, height: 300}}>
        <Button style={[{flex: 1}]} action={openModal}>
          <ImageBackground source={image ? {uri: image} : require('../../assets/street-view.jpg')} style={{flex: 1}} resizeMethod="scale">
            <Section style={[styles.row, styles.justifyContent_between, styles.alignItems_center, styles.marginTop_md]}>
              <Button style={[homeStyle.headerIcon]} action={() => navigation.openDrawer()}>
                <FontAwesome5 name="bars" size={16} color={colors.color1} />
              </Button>
              <View style={[styles.row, styles.alignItems_center]}>
                <Button action={() => navigation.navigate("Home")} style={[homeStyle.headerIcon, styles.marginRight_md]}>
                  <FontAwesome5 name="search" size={16} color={colors.dark} />
                </Button>
                <Button style={[homeStyle.headerIcon]} action={() => console.log('Button clicked')}>
                  <FontAwesome5 name="share-alt" size={16} color={colors.dark} />
                </Button>
              </View>
            </Section>
            {Modal}
          </ImageBackground>
        </Button>
      </View>
  )
}

const ProfileStats = () => {
  return (
    <Section style={[{transform: [{translateY: -30}] }]}>
      <View style={[styles.bg_white, styles.border_r_5, styles.boxShadowDark_sm, styles.padding_sm]}>
        <View style={[styles.row, styles.marginBottom_sm]}>
          <View style={[styles.avatar, styles.marginRight_sm, {overflow: 'hidden', transform: [{translateY: -styles.avatar.height / 2}]} ]}>
            <Image source={require('../../assets/avatar.jpg')} style={{width: '100%', overflow: 'hidden', flex: 1 }} />
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

const NotificationToggle = () => {
  const { ToggleButton } = useToggleButton(true);
  return (
    <Section style={[styles.row, styles.justifyContent_between, styles.alignItems_center]}>
      <View style={[]}>
        <Text numberOfLines={1} style={[styles.fontWeight_700, styles.font_lg,]}>Accepting request</Text>
        <Text numberOfLines={1} style={[styles.fontWeight_700, styles.color_gray, styles.font_sm,]}>
         Active in accepting request on my cookbook
         </Text>
      </View>
      {ToggleButton}
    </Section>
  )
}

const Recent = () => {
  return (
   <CategorizeServices />
  )
}

const UpcomingServices = () => {
  return (
    <Section>
      <ListServiceCard />
      <ListServiceCard />
      <ListServiceCard />
      <ListServiceCard />
      <ListServiceCard />
    </Section>
  )
}

const HistoryRequests = () => {
  return (
    <Section>
      <ListServiceCard />
      <ListServiceCard />
      <ListServiceCard />
      <ListServiceCard />
      <ListServiceCard />
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

  // const ActiveScreen = screens.find((_, index) => index === activeIndex);
  return (
    <Section>
      <View style={[styles.row, styles.marginBottom_md, styles.border_r_35, styles.bg_gray, {height: 50, width: '100%'}]} >
        {screens.map((screen, index) => {
          const { tabTitle } = screen;
          const isActive = index === activeIndex
          return (
            <View key={index} style={[ {flex: 1 }]}>
              <Button action={() => setActiveIndex(index)}
                style={[styles.flexCenter, styles.border_r_35, isActive ? styles.bg_color1 : null, {flex: 1, overflow: 'hidden'}]}>
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
      {/* <View style={[styles.row, styles.justifyContent_between, styles.alignItems_center, styles.marginBottom_md]} >
        <Text numberOfLines={1} style={[styles.font_lg, styles.fontWeight_700]}>{section}</Text>
        <Button action={() => navigation.navigate(screenName)}>
          <Text style={[styles.font_md, styles.color1]}>View all</Text>
        </Button>
      </View> */}
      <ComponentCarousel slides={Services} bullet={false} autoSlide={false} dimensions={{width: '100%', height: 'auto'}} />
    </Section>
  )
}

const homeStyle = StyleSheet.create({
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    ...styles.bg_white,
    ...styles.boxShadowDark_sm,
    ...styles.flexCenter,
  }
})
export default Home;
