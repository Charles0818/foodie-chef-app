import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, Animated } from 'react-native';
import { Screen, Section } from '../Wrapper';
import { styles } from '../styles';
import { Button } from '../../components';
import { select } from 'redux-saga/effects';
import { actions } from '../../helpers';

const { authActions: { storeFirstTimeKey } } = actions;
const progressBarWidth = 100;

const useOnboardScreen = (indicatorWidth) => {
  const [index, setIndex] = React.useState(0);
  const updateIndex = event => {
    //width of the view size
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    //get current position of scrollView
    const contentOffset = event.nativeEvent.contentOffset.x;

    const selectedIndex = Math.floor(contentOffset / viewSize);
    setIndex(selectedIndex * indicatorWidth);
  };
  return { updateIndex, index, setIndex };
};

const OnboardScreen = ({ navigation }) => {
  const action = () => {
    storeFirstTimeKey();
    navigation.replace("Auth", {screen: "LoginOptions"})
  }
  const slides = onboardSlides({ action });
  const indicatorWidth = progressBarWidth / slides.length
  const { updateIndex, index: selectedIndex, setIndex } = useOnboardScreen(indicatorWidth);
  console.log(selectedIndex);

  return (
    <Screen style={[styles.paddingBottom_md, styles.paddingTop_md]}>
      <View style={[styles.alignItems_end, styles.paddingHorizontal_sm]}>
        <Button action={action}
          style={[styles.marginBottom_md]}>
          <Text style={[styles.color1, styles.fontWeight_700, styles.font_md]}>Skip >></Text>
        </Button>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={event => updateIndex(event)}
        pagingEnabled={true}
      >
      {slides.map((Slide, index) => (
        <View key={index} style={[styles.flexCenter, styles.padding_lg, onboardStyle.slideWrapper, {flex: 1}]}>
          {Slide}
        </View>
      ))}
      </ScrollView>
      <View style={[styles.flexEnd]}>
        <View style={[onboardStyle.progressBar]}>
          <Animated.View key={selectedIndex} style={[onboardStyle.currentScreen, {width: indicatorWidth, transform: [{ translateX: selectedIndex }] }]} />
        </View>
      </View>
    </Screen>
  )
}

const Slide = ({svg, title, text}) => {
  return (
    <View style={[styles.flexCenter]}>
      <View style={[styles.marginBottom_lg, {width: 300, height: 300}]}>
        <Image source={svg} resizeMethod="scale" style={{width: '100%', flex: 1}} />
      </View>
      <Text style={[styles.font_xxlg, styles.fontWeight_700, styles.text_center, styles.marginBottom_md]}>{title}</Text>
      <Text style={[styles.font_md, styles.text_center]}>{text}</Text>
    </View>
  )
}
const onboardSlides = ({ action }) => {
  const slides = [
    <Slide svg={require('../../assets/customer-onboarding-1_discover.jpg')}
      title="Discover place near you"
      text="We make it simple to find the food you crave. Enter your address and let us do the rest."
    />,
    <Slide svg={require('../../assets/customer-onboarding-1_dish.jpg')}
      title="Choose a tasty dish"
      text="When you order Eat Street, we'll hook you up with exclusive coupons, specials and rewards"
    />,
    <View style={[styles.flexCenter]}>
      <Slide svg={require('../../assets/cust-onboard-screen4-1_delivery.jpg')}
        title="Pick Up or Delivery"
        text="We make food ordering fast, simple and free - no matter if you order online or cash"
      />
      <View style={[styles.marginTop_md]}>
        <Button action={action}
          style={[styles.bg_color1, styles.border_r_5, styles.flexCenter, styles.marginBottom_md, {width: 250, height: 50}]}>
          <Text numberOfLines={1} style={[styles.color_white, styles.text_center, styles.fontWeight_700, styles.font_sm]}>Get Started</Text>
        </Button>
      </View>
    </View>
  ]
  return slides
}

const onboardStyle = StyleSheet.create({
  slideWrapper: {
    width: Dimensions.get('window').width
  },
  progressBar: {
    width: progressBarWidth,
    height: 5,
    borderRadius: 5,
    overflow: 'hidden',
    ...styles.bg_gray
  },
  currentScreen: {
    flex: 1,
    ...styles.bg_color1,
    borderRadius: 5,
  }
});

export default OnboardScreen;
