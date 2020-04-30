import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Screen, Section } from '../Wrapper';
import { styles } from '../styles';
import { Button } from '../../components';

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
  const slides = onboardSlides({ navigation });
  const indicatorWidth = progressBarWidth / slides.length
  const { updateIndex, index: selectedIndex, setIndex } = useOnboardScreen(indicatorWidth);
  const scrollRef = React.useRef();
  React.useEffect(() => {
    scrollRef.current.scrollTo({
      animated: true,
      y: 0,
      x: selectedIndex,
    });
    return () => clearInterval(interval);
  }, [selectedIndex]);
  return (
    <Screen style={[styles.paddingVertical_md]}>
      <Section style={[{flex: 1}]}>
        <Button action={() => navigation.navigate("LoginOptions")}
          style={[styles.alignItems_end, styles.marginBottom_md]}>
          <Text style={[styles.color1]}>Skip >></Text>
        </Button>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={event => updateIndex(event)}
        >
        {slides.map((Slide, index) => (
          <View key={index} style={[styles.flexCenter, {flex: 1}]}>
            {Slide}
          </View>
        ))}
        </ScrollView>
        <View style={[styles.flexEnd]}>
          <View style={[onboardStyle.progressBar]}>
            <View ref={scrollRef} style={[onboardStyle.currentScreen, {width: indicatorWidth}]} />
          </View>
        </View>
      </Section>
    </Screen>
  )
}

const Slide = ({svg, title, text}) => {
  return (
    <View style={[flexCenter]}>
      <View style={[styles.marginBottom_lg, {width: 300, height: 200}]}>
        <Image source={{uri: svg}} resizeMethod="scale"
          />
      </View>
      <Text style={[styles.font_lg, styles.textCenter, styles.marginBottom_md]}>{title}</Text>
      <Text style={[styles.font_sm, styles.textCenter]}>{text}</Text>
    </View>
  )
}
const onboardSlides = ({ navigation }) => {
  const slides = [
    <Slide svg=""
      title="Discover place near you"
      text="We make it simple to find the food you crave. Enter your address and let us do the rest."
    />,
    <Slide svg=""
      title="Choose a tasty dish"
      text="When you order Eat Street, we'll hook you up with exclusive coupons, specials and rewards"
    />,
    <View style={[styles.flexCenter]}>
      <Slide svg=""
        title="Pick Up or Delivery"
        text="We make food ordering fast, simple and free - no matter if you order online or cash"
      />
      <Button onClick={navigation.navigate("LoginOptions")}
        style={[styles.bg_color1, styles.border_r_5, styles.flexCenter, styles.marginBottom_md, {width: 250, height: 50}]}>
        <Text numberOfLines={1} style={[styles.color_white, styles.textCenter, styles.fontWeight_700, styles.font_sm]}>Get Started</Text>
      </Button>
    </View>
  ]
  return slides
}

const onboardStyle = StyleSheet.create({
  progressBar: {
    width: progressBarWidth,
    height: 5,
    borderRadius: 5,
    overflow: hidden,
    ...styles.bg_gray
  },
  currentScreen: {
    flex: 1,
    ...styles.bg_color1,
    borderRadius: 5,
  }
});

export default OnboardScreen;
